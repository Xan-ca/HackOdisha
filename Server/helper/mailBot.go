package helper

import (
	"crypto/rand"
	"encoding/json"
	"math/big"
	"net/http"
	"net/smtp"
	
)

func MailBot(subject string, body string) {

	from := "ankushbag1605@gmail.com"
	password := "zmxdbjtxfmuhgqwa"

	toEmailAddress := "ankushbag104@gmail.com"
	to := []string{toEmailAddress}

	host := "smtp.gmail.com"
	port := "587"
	address := host + ":" + port

	message := []byte(subject + body)

	auth := smtp.PlainAuth("", from, password, host)

	err := smtp.SendMail(address, auth, from, to, message)
	if err != nil {
		panic(err)
	}

}
func OtpBot(w http.ResponseWriter, r *http.Request) {
	var Otp string
	i := 0
	for i < 4 {
		i++
		v, _ := rand.Int(rand.Reader, big.NewInt(9))
		Otp += v.String()
	}
	MailBot("Verge-studio Sign In OTP", Otp)
	json.NewEncoder(w).Encode("mesaage sent")
}
