using System;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace MongoDB_Test2.Models;

public class Fruit 
{
    public ObjectId _id { get; set; }
    [Required(ErrorMessage = "Header is required")]
    public string? header { get; set; }
    [Required(ErrorMessage = "Description is required")]
    public string? description { get; set; }
    [Required(ErrorMessage = "Image is required")]
    public string? image { get; set; }
}