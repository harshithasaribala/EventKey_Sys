using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EventKey.Server.Models;
using EventKey.Server.Infrastructure;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace EventKey.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly DataContext _context;

        public EventsController(DataContext context)
        {
            _context = context;
        }

        // POST: api/Events
        [HttpPost]
        public async Task<IActionResult> CreateEvent([FromBody] Events eventModel)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            // Add the event to the database
            _context.Events.Add(eventModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEventById), new { id = eventModel.EventId }, eventModel);
        }

        // GET: api/Events
        [HttpGet]
        public async Task<IActionResult> GetAllEvents()
        {
            var events = await _context.Events.ToListAsync();
            return Ok(events);
        }

        // GET: api/Events/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetEventById(string id)
        {
            var eventModel = await _context.Events.FindAsync(id);
            if (eventModel == null)
            {
                return NotFound("Event not found");
            }
            return Ok(eventModel);
        }

        // PUT: api/Events/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(string id, [FromBody] Events updatedEvent)
        {
            var eventModel = await _context.Events.FindAsync(id);
            if (eventModel == null)
            {
                return NotFound("Event not found");
            }

            // Update the event details
            eventModel.EventName = updatedEvent.EventName;
            eventModel.Organizer = updatedEvent.Organizer;
            eventModel.EventDate = updatedEvent.EventDate;
            eventModel.Location = updatedEvent.Location;
            eventModel.Description = updatedEvent.Description;
            eventModel.ticketPrice = updatedEvent.ticketPrice;
            eventModel.MaxAttendees = updatedEvent.MaxAttendees;
            eventModel.RegisteredAttendees = updatedEvent.RegisteredAttendees;

            await _context.SaveChangesAsync();
            return Ok(eventModel);
        }

        // DELETE: api/Events/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(string id)
        {
            var eventModel = await _context.Events.FindAsync(id);
            if (eventModel == null)
            {
                return NotFound("Event not found");
            }

            // Remove the event
            _context.Events.Remove(eventModel);
            await _context.SaveChangesAsync();
            return Ok("Event deleted successfully");
        }
    }
}
