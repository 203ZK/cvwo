package models

import "gorm.io/gorm"

type Thread struct {
	gorm.Model
	Username string
	Title    string
	Content  string
	Posts    []Post `gorm:"foreignKey:ThreadID"`
	Flair    string
}
