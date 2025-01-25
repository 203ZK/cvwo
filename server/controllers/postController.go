package controllers

import (
	"net/http"
	"strconv"

	"cvwo/server/initialisers"
	"cvwo/server/models"

	"github.com/gin-gonic/gin"
)

func GetComments(c *gin.Context) {
	threadID, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse ID",
		})
		return
	}
	
	// Fetch posts where thread_id = ThreadID
	var thread models.Thread
	var posts []models.Post

	threadResult := initialisers.DB.First(&thread, "id = ?", threadID)
	postsResult := initialisers.DB.Find(&posts, "thread_id = ?", threadID)

	// Check for request errors
	if threadResult.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to load thread",
		})
		return
	}
	if postsResult.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to load posts",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"thread":   thread,
		"comments": posts,
	})
}

func CreatePost(c *gin.Context) {
	var body struct {
		Username string
		ThreadID int
		Content  string
	}

	if c.ShouldBindJSON(&body) != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to read body",
		})
		return
	}

	post := models.Post{
		Username: body.Username,
		ThreadID: body.ThreadID,
		Content:  body.Content,
	}
	result := initialisers.DB.Create(&post)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to create post",
		})
		return
	}

	// Respond
	c.JSON(http.StatusOK, gin.H{
		"message": "Post created",
	})
}

func DeleteComment(c *gin.Context) {
	commentID, err := strconv.Atoi(c.Param("id"))

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to parse ID",
		})
		return
	}

	result := initialisers.DB.Delete(&models.Post{}, commentID)

	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Failed to delete comment",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{})
}
