using System;
using System.ComponentModel.DataAnnotations;

namespace EventKey.Server.Models
{
    public class Events
    {
        [Key]
        [Required]
        public string EventId { get; set; } = GenerateUniqueId();

        [Required]
        public string EventName { get; set; }

        [Required]
        public string Organizer { get; set; }
        [Required]
        public DateTime EventDate { get; set; }
        [Required]
        public string Location { get; set; }

        public string Description { get; set; }
        [Required]
        public int ticketPrice { get; set; }
        [Required]
        public int MaxAttendees { get; set; }

        public int RegisteredAttendees { get; set; } = 0; // Default value

        // Method to generate a unique 10-character ID
        private static string GenerateUniqueId()
        {
            return Guid.NewGuid().ToString("N").Substring(0, 10).ToUpper();
        }
    }
}
