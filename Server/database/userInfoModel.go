package database

import (
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type User struct {
	ID          string `json:"userid"`
	Username    string `json:"username"`
	PhoneNumber string `json:"phone"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	Content     string `json:"content"`
}

var Db *gorm.DB
var err error

func ConnectToPostgreSQL() (*gorm.DB, error) {
	dsn := "user=postgres password=Ankush@2005db dbname=Ticketing-ChatBot-DB host=localhost port=5432 sslmode=disable"
	Db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		fmt.Print(err)
	}

	return Db, nil
}

func ConnectToDatabase() {
	Db, err = ConnectToPostgreSQL()
	if err != nil {
		log.Fatal(err)
	}

	// Perform database migration
	err = Db.AutoMigrate(&Ticket{})
	err = Db.AutoMigrate(&User{}, &Museum{})

	if err != nil {
		log.Fatal(err)
	}
}
