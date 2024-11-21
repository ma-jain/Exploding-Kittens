package main

import (
	"encoding/json"
	"fmt"
	"math/rand"
	"net/http"
	"time"

	"github.com/go-redis/redis/v8"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"golang.org/x/net/context"
)

var ctx = context.Background()

// Initialize Redis client
var rdb = redis.NewClient(&redis.Options{
	Addr:     "localhost:6379", // Update with your Redis server address
	Password: "",               // No password
	DB:       0,
})

// Card Types
var cards = []string{"😼 Cat Card", "🙅‍♂️ Defuse Card", "🔀 Shuffle Card", "💣 Exploding Kitten Card"}

// API to generate a random card
func GetCardAPI(w http.ResponseWriter, r *http.Request) {
	card := cards[rand.Intn(len(cards))]
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"card": card})
}

// API to handle username and game loading/saving
func UsernameAPI(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")
	if username == "" {
		http.Error(w, "Username is required", http.StatusBadRequest)
		return
	}

	// Check if user exists
	key := "user:" + username
	if exists, _ := rdb.Exists(ctx, key).Result(); exists > 0 {
		// Load previous game data
		data, _ := rdb.HGetAll(ctx, key).Result()
		json.NewEncoder(w).Encode(map[string]interface{}{
			"message": "Welcome back!",
			"data":    data,
		})
	} else {
		// Create a new game
		rdb.HSet(ctx, key, map[string]interface{}{
			"deck":        "😼,🙅‍♂️,🔀,💣,😼",
			"defuseCards": 0,
			"score":       0,
		})
		json.NewEncoder(w).Encode(map[string]string{
			"message": "New game started!",
		})
	}
}

// API for leaderboard
func LeaderboardAPI(w http.ResponseWriter, r *http.Request) {
	scores, _ := rdb.ZRevRangeWithScores(ctx, "leaderboard", 0, 4).Result()

	leaderboard := []map[string]interface{}{}
	for _, score := range scores {
		leaderboard = append(leaderboard, map[string]interface{}{
			"username": score.Member,
			"score":    int(score.Score),
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(leaderboard)
}

// API to update score after the user wins
func UpdateScoreAPI(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Query().Get("username")
	if username == "" {
		http.Error(w, "Username is required", http.StatusBadRequest)
		return
	}

	// Increment user score
	key := "user:" + username
	score, _ := rdb.HIncrBy(ctx, key, "score", 1).Result()

	// Update leaderboard
	rdb.ZAdd(ctx, "leaderboard", &redis.Z{
		Score:  float64(score),
		Member: username,
	})

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Score updated!",
	})
}

// Middleware for shuffle action
func shuffleDeck(deck []string) []string {
	rand.Seed(time.Now().UnixNano())
	shuffled := make([]string, len(deck))
	perm := rand.Perm(len(deck))
	for i, v := range perm {
		shuffled[v] = deck[i]
	}
	return shuffled
}

// Main function
func main() {
	r := mux.NewRouter()

	// Seed for random number generation
	rand.Seed(time.Now().UnixNano())

	// Routes
	r.HandleFunc("/api/get-card", GetCardAPI).Methods("GET")
	r.HandleFunc("/api/username", UsernameAPI).Methods("GET")
	r.HandleFunc("/api/leaderboard", LeaderboardAPI).Methods("GET")
	r.HandleFunc("/api/update-score", UpdateScoreAPI).Methods("POST")

	// Add CORS middleware
	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"}, // Allow all origins, or specify allowed origins
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization"},
		AllowCredentials: true,
	})

	// Start server with CORS
	fmt.Println("Server running on port 8081...")
	http.ListenAndServe(":8081", corsHandler.Handler(r))
}
