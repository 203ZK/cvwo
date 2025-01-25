package initialisers

import (
	"cvwo/server/models"
)

func SyncDatabase() {
	DB.AutoMigrate(&models.User{})
	DB.AutoMigrate(&models.Thread{})
	DB.AutoMigrate(&models.Post{})
}
