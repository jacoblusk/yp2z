package main

import (
	"net/http"
	"strconv"
)

const StaticFolder = "static"
const Port = 3000

func main() {
	staticFiles := http.FileServer(http.Dir(StaticFolder))
	http.Handle("/", staticFiles)
	http.HandleFunc("/ajax/", ajaxHandler)
	http.ListenAndServe(":" + strconv.Itoa(Port), nil)
}

func ajaxHandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("Hello, world!"))
}
