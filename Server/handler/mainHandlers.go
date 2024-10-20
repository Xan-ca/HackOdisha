package handler

import (
	"encoding/json"
	"fmt"
	"net/http"
	"server/database"

	//"server/helper"
	"strconv"
	"github.com/gorilla/mux"
)


type User database.User

var count int64 = 0


func GetAllUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	var users []User
	database.Db.Find(&users)
	json.NewEncoder(w).Encode(&users)
}
func SubmitContentById(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	var user User
	var userResp User
	json.NewDecoder(r.Body).Decode(&user)
	params := mux.Vars(r)
	user.ID = params["id"]
	_ = database.Db.Where(&User{ID: user.ID}).Find(&userResp)

	userResp.Content = user.Content
	result := database.Db.Save(&userResp)
	if result.Error != nil {
		fmt.Println(result.Error)
	}
	json.NewEncoder(w).Encode(&userResp)
}

func GetOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	params := mux.Vars(r)
	var user User
	database.Db.First(&user, params["id"])
	json.NewEncoder(w).Encode(&user)
}

func CreateOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	var user User
	user.ID = strconv.Itoa(AssignID() + 1)
	json.NewDecoder(r.Body).Decode(&user)
	result := database.Db.Create(&user)
	if result.Error != nil {
		fmt.Println(result.Error)
	}
	json.NewEncoder(w).Encode(&user)
}

func DeleteOneUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	params := mux.Vars(r)
	var user User
	database.Db.First(&user, params["id"])
	database.Db.Delete(&user)
	var users []User
	database.Db.Find(&users)
	json.NewEncoder(w).Encode(&users)
}
func DeleteAllUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application.json")
	var users []User
	database.Db.Find(&users)
	database.Db.Delete(&users)
	json.NewEncoder(w).Encode(&users)
}

func ServeHome(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("<h1>WELCOME USER</h1>"))
}
func AssignID() int {

	database.Db.Table("users").Count(&count)
	return int(count)
}
