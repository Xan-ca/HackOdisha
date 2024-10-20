package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/database"
	"strconv"

	"github.com/gorilla/mux"
)

type Ticket database.Ticket

func SumbmitOneTicket(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	var ticket Ticket
	ticket.ID = strconv.Itoa(AssignTID() + 1)
	json.NewDecoder(r.Body).Decode(&ticket)
	result := database.Db.Create(&ticket)
	if result.Error != nil {
		fmt.Println(result.Error)
	}
	json.NewEncoder(w).Encode(&ticket)
}
func AssignTID() int {

	database.Db.Table("tickets").Count(&count)
	return int(count)
}
func GetAllTickets(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	var tickets []Ticket
	database.Db.Find(&tickets)
	json.NewEncoder(w).Encode(&tickets)
}
func GetOneTicket(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	params := mux.Vars(r)
	var ticket Ticket
	database.Db.First(&ticket, params["id"])
	json.NewEncoder(w).Encode(&ticket)
}
func DeleteOneTicket(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	params := mux.Vars(r)
	var user Ticket
	database.Db.First(&user, params["id"])
	database.Db.Delete(&user)
	var tickets []Ticket
	database.Db.Find(&tickets)
	json.NewEncoder(w).Encode(&tickets)
}
func DeleteAllTickets(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	var tickets []Ticket
	database.Db.Find(&tickets)
	database.Db.Delete(&tickets)
	json.NewEncoder(w).Encode(&tickets)
}
