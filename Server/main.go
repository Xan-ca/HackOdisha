package main

import (
	"net/http"
	"server/database"
	"server/handler"

	//"server/helper"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
)

// do the id assigning part
func main() {
	database.ConnectToDatabase()

	r := mux.NewRouter()

	r.HandleFunc("/", handler.ServeHome).Methods("GET")
	r.HandleFunc("/Users", handler.GetAllUsers).Methods("GET")
	r.HandleFunc("/Users/{id}", handler.GetOneUser).Methods("GET")
	r.HandleFunc("/Users", handler.CreateOneUser).Methods("POST")
	r.HandleFunc("/Users/{id}", handler.DeleteOneUser).Methods("DELETE")
	r.HandleFunc("/Users", handler.DeleteAllUser).Methods("DELETE")
	r.HandleFunc("/UserCont/{id}", handler.SubmitContentById).Methods("PUT")

	r.HandleFunc("/Museums", handler.GetAllMuseums).Methods("GET")
	r.HandleFunc("/Museums/{id}", handler.GetOneMuseum).Methods("GET")
	r.HandleFunc("/Museums", handler.SumbmitOneMuseum).Methods("POST")
	r.HandleFunc("/Museums/{id}", handler.DeleteOneMuseum).Methods("DELETE")
	r.HandleFunc("/Museums", handler.DeleteAllMuseums).Methods("DELETE")

	r.HandleFunc("/Tickets", handler.GetAllTickets).Methods("GET")
	r.HandleFunc("/Tickets/{id}", handler.GetOneTicket).Methods("GET")
	r.HandleFunc("/Tickets", handler.SumbmitOneTicket).Methods("POST")
	r.HandleFunc("/Tickets/{id}", handler.DeleteOneTicket).Methods("DELETE")
	r.HandleFunc("/Tickets", handler.DeleteAllTickets).Methods("DELETE")

	http.ListenAndServe(":9000",
		handlers.CORS(
			handlers.AllowedOrigins([]string{"http://localhost:5173"}),
			handlers.AllowCredentials(),
			handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
			handlers.AllowedMethods([]string{"GET", "HEAD", "POST", "PUT", "DELETE", "OPTIONS"}),
		)(r))
}
