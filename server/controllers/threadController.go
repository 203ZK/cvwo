package controllers

import (
	"net/http"
	"strconv"

	"cvwo/server/initialisers"
	"cvwo/server/models"

	"github.com/gin-gonic/gin"
)

func GetThreads(c *gin.Context) {
	// Fetch posts
	var threads []models.Thread
	result := initialisers.DB.Find(&threads)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Could not find threads",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": threads,
	})
}

func GetThread(c *gin.Context) {
	threadID, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse ID",
		})
		return
	}

	var thread models.Thread
	result := initialisers.DB.First(&thread, "ID = ?", threadID)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Could not find thread",
		})
		return
	}

	// Respond
	c.JSON(http.StatusOK, gin.H{
		"thread": thread,
	})
}

func CreateThread(c *gin.Context) {
	// Get post details
	var body struct {
		Username string
		Title    string
		Content  string
		Flair    string
	}

	if c.ShouldBindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	thread := models.Thread{
		Username: body.Username,
		Title:    body.Title,
		Content:  body.Content,
		Flair:    body.Flair,
	}
	result := initialisers.DB.Create(&thread)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create thread",
		})
		return
	}

	// Respond
	c.JSON(http.StatusOK, gin.H{
		"message": "Thread created",
	})
}

func UpdateThread(c *gin.Context) {
	var body struct {
		Title   string
		Content string
		Flair   string
	}

	if c.ShouldBindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	threadID, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse ID",
		})
		return
	}

	result := initialisers.DB.Model(&models.Thread{}).Where("ID = ?", threadID).Updates(map[string]interface{}{
		"Title":   body.Title,
		"Content": body.Content,
		"Flair":   body.Flair,
	})

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to update thread",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
