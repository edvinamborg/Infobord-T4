using System;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace MongoDB_Test2.Models;

public class Fruit 
{
    public ObjectId _id { get; set; }
    [Required(ErrorMessage = "Name is required")]
    public string? name { get; set; }
    [Required(ErrorMessage = "Description is required")]
    public string? description { get; set; }
    [Required(ErrorMessage = "Image string is required")]
    public string? image_string { get; set; }
}