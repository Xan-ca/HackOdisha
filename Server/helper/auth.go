package helper

import (
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("key_to_destiny")

type Credentials struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Validate(w http.ResponseWriter, r *http.Request) bool {

	cookieToken, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			return false
		}
		w.WriteHeader(http.StatusBadRequest)
		return false
	}

	tokenString := cookieToken.Value
	type Claims struct {
		Email   string `json:"email"`
		Exptime int64  `json:"expirationtime"`
		jwt.RegisteredClaims
	}
	var claims Claims
	tkn, err := jwt.ParseWithClaims(tokenString, &claims,
		func(t *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return false
		}
		w.WriteHeader(http.StatusBadRequest)
		return false
	}

	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
		return false
	}

	return true

}

func GenerateAuthToken(mail string, exprietime *jwt.NumericDate) (string, *jwt.Token, error) {
	type MyCustomClaims struct {
		Email string `json:"email"`
		jwt.RegisteredClaims
	}

	// Create claims with multiple fields populated
	claims := MyCustomClaims{
		mail,
		jwt.RegisteredClaims{
			// A usual scenario is to set the expiration time relative to the current time
			ExpiresAt: exprietime,
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			Issuer:    "Server",
			Subject:   "Logged in",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString(jwtKey)

	return tokenString, token, err

}

func TokenRefresh(w http.ResponseWriter, r *http.Request) {
	cookieToken, err := r.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	tokenString := cookieToken.Value
	type Claims struct {
		Email string `json:"email"`
		jwt.RegisteredClaims
	}
	var claims Claims
	tkn, err := jwt.ParseWithClaims(tokenString, &claims,
		func(t *jwt.Token) (interface{}, error) {
			return jwtKey, nil
		})

	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			w.WriteHeader(http.StatusUnauthorized)
			return
		}
		w.WriteHeader(http.StatusBadRequest)
		return
	}

	if !tkn.Valid {
		w.WriteHeader(http.StatusUnauthorized)
	}
	jwtexptime, _ := claims.GetIssuedAt()
	exptime := jwtexptime.Time
	if time.Since(exptime) > time.Minute*1 {
		expirationTimeClient := time.Now().Add(time.Minute * 5)

		http.SetCookie(w,
			&http.Cookie{
				Name:    "refresh-token",
				Value:   tokenString,
				Expires: expirationTimeClient,
			})
	}

}
