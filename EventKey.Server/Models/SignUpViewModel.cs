﻿namespace EventKey.Server.Models
{
    public class SignUpViewModel
    {
        public string UserType { get; set; }
        public required string FullName { get; set; }
        public required int Age { get; set; }
        public required string Gender { get; set; }
        public required string CompanyName { get; set; }
        public required string EventType { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string PhoneNumber { get; set; }
        public required string Address { get; set; }

    }
}
