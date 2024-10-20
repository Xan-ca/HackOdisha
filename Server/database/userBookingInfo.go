package database

type Ticket struct {
	ID               string `json:"bookingid"`
	UserName         string `json:"username"`
	BookedMuseumID   string `json:"museumid"`
	BookedMuseumName string `json:"museumname"`
	TicketsBooked    string `json:"ticketsbooked"`
	ValidAt          string `json:"validat"`
}
