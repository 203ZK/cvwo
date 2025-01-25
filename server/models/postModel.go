package models

import "gorm.io/gorm"

type Post struct {
	gorm.Model
	Username string
	ThreadID int
	Content  string
}
