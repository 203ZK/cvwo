package main

import (
	"cvwo/server/controllers"
	"cvwo/server/initialisers"
	"cvwo/server/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func init() {
	initialisers.LoadEnvVariables()
	initialisers.ConnectToDb()
	initialisers.SyncDatabase()
}

func main() {
	r := gin.Default()

	corsOptions := cors.New(cors.Config{
		AllowOrigins:     []string{"*"},                                     // Allow all origins (you can specify specific origins here)
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH"}, // Allowed methods
		AllowHeaders:     []string{"Content-Type", "Authorization"},         // Allowed headers
		AllowCredentials: true,
	})

	// Wrap Gin router with CORS middleware
	r.Use(corsOptions)

	// Users controller
	r.GET("/get-users", controllers.GetUsers)
	r.POST("/login", controllers.Login)
	r.POST("/signup", controllers.Signup)
	r.GET("/validate", middleware.RequireAuth, controllers.Validate)

	// Threads controller
	r.GET("/get-threads", controllers.GetThreads)
	r.GET("/get-thread/:id", controllers.GetThread)
	r.POST("/create-thread", controllers.CreateThread)
	r.PATCH("/update-thread/:id", controllers.UpdateThread)

	// Posts controller
	r.GET("/get-comments/:id", controllers.GetComments)
	r.POST("/create-comment", controllers.CreatePost)
	r.DELETE("/delete-comment/:id", controllers.DeleteComment)

	r.Run()
}
