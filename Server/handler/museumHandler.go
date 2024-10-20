package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/database"

	"strconv"

	"github.com/gorilla/mux"
)

type Museum database.Museum

func SumbmitOneMuseum(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	var museum Museum
	museum.ID = strconv.Itoa(AssignMID() + 1)
	json.NewDecoder(r.Body).Decode(&museum)
	result := database.Db.Create(&museum)
	if result.Error != nil {
		fmt.Println(result.Error)
	}
	json.NewEncoder(w).Encode(&museum)
}
func AssignMID() int {
	database.Db.Table("museums").Count(&count)
	return int(count)
}
func GetAllMuseums(w http.ResponseWriter, r *http.Request) {
	//w.Write([]byte("<h1>WELCOME USER</h1>"))
	w.Header().Set("Content-Type", "application.json")
	var museums []Museum
	database.Db.Find(&museums)
	json.NewEncoder(w).Encode(&museums)
}
func GetOneMuseum(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	params := mux.Vars(r)
	var museum Museum
	database.Db.First(&museum, params["id"])
	json.NewEncoder(w).Encode(&museum)
}
func DeleteOneMuseum(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	params := mux.Vars(r)
	var user Museum
	database.Db.First(&user, params["id"])
	database.Db.Delete(&user)
	var museums []Museum
	database.Db.Find(&museums)
	json.NewEncoder(w).Encode(&museums)
}
func DeleteAllMuseums(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	var museums []Museum
	database.Db.Find(&museums)
	database.Db.Delete(&museums)
	json.NewEncoder(w).Encode(&museums)
}
