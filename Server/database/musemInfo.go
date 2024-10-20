package database

type Museum struct {
	ID                string `json:"museumid"`
	MuseumImg         string `json:"museumimg"`
	MuseumName        string `json:"museumname"`
	MuseumInfo        string `json:"museuminfo"`
	MuseumLocation    string `json:"museumlocation"`
	MuseumShowsNumber int    `json:"museumshowsnumber"`
	MuseumTime        string `json:"museumtime"`
	MuseumCost        int    `json:"museumcost"`
}
