import { Calendar, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Schedule = () => {
  // Google Calendar link to create a new event with Enzo
  const googleCalendarUrl = "https://calendar.google.com/calendar/u/0/r/eventedit?text=Meeting+with+Enzo+Lebrun&details=Let's+discuss+your+project+or+opportunity!";

  return (
    <div className="min-h-screen gradient-hero flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-lg w-full text-center space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to portfolio
        </Link>

        <div className="space-y-4">
          <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
            <Calendar className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Schedule a Meeting
          </h1>
          
          <p className="text-muted-foreground text-lg">
            Let's connect! Click below to schedule a meeting with me via Google Calendar.
          </p>
        </div>

        <Button 
          asChild 
          size="lg" 
          className="w-full max-w-xs"
        >
          <a 
            href={googleCalendarUrl} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Open Google Calendar
          </a>
        </Button>

        <p className="text-muted-foreground/60 text-sm">
          You'll be redirected to Google Calendar to create an event.
        </p>
      </div>
    </div>
  );
};

export default Schedule;
