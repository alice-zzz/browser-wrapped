import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import UploadBox from "./UploadBox";
import { useEffect } from "react";

function App() {
  const [count, setCount] = useState(0)
  const [historyData, setHistoryData] = useState(null);
  const [cleanedData, setCleanedData] = useState([]);
  const [delay, setDelay] = useState(false);

  const [slide, setSlide] = useState("upload");


  function handleFile(file) {
    const reader = new FileReader();
  
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target.result);
  
        setHistoryData(json);

        const cleaned = json.map(entry => {
          const url = entry.url;
          const title = entry.title || "";
          const visitTime = new Date(entry.visitTime);
          const domain = new URL(url).hostname;
          const visitCount = entry.visitCount || 1;          
  
          return {
            url,
            title,
            visitTime,
            domain,
            visitCount,
            hour: visitTime.getHours(),
            day: visitTime.getDay(),
            date: visitTime.toISOString().split("T")[0]
          };
        });
  
        setCleanedData(cleaned);
        setSlide("slide1_intro");
  
      } catch (err) {
        console.error("Invalid JSON file:", err);
      }
    };
  
    reader.readAsText(file);
  }


  // grabbing stats

  function VisitedDomains(data) {
    const counts = {};
  
    data.forEach(entry => {
      counts[entry.domain] = (counts[entry.domain] || 0) + entry.visitCount;
    });
  
    // Convert to array and sort by count descending
    return Object.entries(counts)
      .map(([domain, count]) => ({ domain, count }))
      .sort((a, b) => b.count - a.count);
  }


  function VisitHour(data) {
    const times = {};
  
    data.forEach(entry => {
      times[entry.hour] = (times[entry.hour] || 0) + entry.visitCount;
    });
  
   return Object.entries(times)
      .map(([hour, count]) => ({ hour, count }))
      .sort((a, b) => b.count - a.count);
  }

  function VisitDay(data) {
    const times = {};
  
    data.forEach(entry => {
      times[entry.date] = (times[entry.date] || 0) + entry.visitCount;
    });
  
   return Object.entries(times)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => b.count - a.count);
  }


  function VisitDayofWeek(data) {
    const times = {};
  
    data.forEach(entry => {
      times[entry.day] = (times[entry.day] || 0) + entry.visitCount;
    });
  
   return Object.entries(times)
      .map(([day, count]) => ({ day, count }))
      .sort((a, b) => b.count - a.count);
  }

  function formatHour(hour) {
    const h = Number(hour);
  
    if (h === 0) return "12:00 AM";
    if (h === 12) return "12:00 PM";
    if (h < 12) return `${h}:00 AM`;
    return `${h - 12}:00 PM`;
  }
  
  function getHourComment(hour) {
    const h = Number(hour);
  
    if (h >= 1 && h < 5) {
      return "Pull all-nighters often?";
    }
    if (h >= 5 && h < 9) {
      return "What an early bird!";
    }
    if (h >= 9 && h < 12) {
      return "You enjoy some morning browsing before your day gets started.";
    }
    if (h >= 12 && h < 17) {
      return "The internet always comes in handy throughout the day.";
    }
    if (h >= 17 && h < 21) {
      return "Unwind through evening browsing.";
    }
    return "Searching up a few more things before bed?.";
  }
  
  function formatDayOfWeek(day) {
    const names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return names[Number(day)];
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  }

  function Slide({ children }) {
    return (
      <div className="font-['Funnel_Sans']"
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
          animation: "fadeIn 0.8s ease"
        }}
      >
        {children}
      </div>
    );
  }

  useEffect(() => {
    // auto‑advance for intro slides
    const autoSlides = ["slide1_intro", "slide2_intro", "slide3_intro", "slide4_intro"];
  
    if (autoSlides.includes(slide)) {
      const timer = setTimeout(() => {
        if (slide === "slide1_intro") setSlide("slide1");
        if (slide === "slide2_intro") setSlide("slide2");
        if (slide === "slide3_intro") setSlide("slide3");
        if (slide === "slide4_intro") setSlide("slide4");
      }, 3000); 
  
      return () => clearTimeout(timer);
    }
  }, [slide]);
  
  useEffect(() => {
    // delay
    const delayedSlides = ["slide1", "slide2", "slide3", "slide4"];
  
    if (delayedSlides.includes(slide)) {
      const timer = setTimeout(() => {
        setDelay(true);
      }, 2000); 
  
      return () => clearTimeout(timer);
    } else {
      setDelay(false);
    }
  }, [slide]);
  
  

  return (
    <>
      {slide === "upload" && (
        <>
        <h1 className="font-['Funnel_Sans'] text-4xl font-bold">Welcome to your Browser History Wrapped!</h1>
        <p className="font-['Funnel_Sans'] text-xl text-gray-600 mt-2">
            Upload your browser history as a JSON file to get started.
        </p>
        <UploadBox onFileSelect={handleFile} />
        </>
      )}

      {slide === "slide1_intro" && (
        <Slide>
          <p className="font-['DynaPuff'] text-2xl mb-6">
            Your browsing history is vast and varied, but one site stood out...
          </p>
        </Slide>
      )}
      

      {slide === "slide1" && cleanedData.length > 0 && (
        <Slide>
          <h1 className="text-4xl font-bold mb-4">Your most visited domain was</h1>

          <p className="text-2xl">
            {VisitedDomains(cleanedData)[0].domain}
          </p>

          <p className="text-xl text-gray-600 mt-2">
            which you visited a whopping {VisitedDomains(cleanedData)[0].count} times!
          </p>

          {/* Top 5 list */}
          {delay && (
            <div style={{ animation: "fadeIn 0.8s ease" }}>
              <p className="text-xl text-gray-600 mt-10">Wonder what else you were up to?</p>
              <h2 className="text-2xl font-bold mb-4">These were your top 5 Domains</h2>

              <ul className="space-y-2 text-lg">
                {VisitedDomains(cleanedData).slice(0, 5).map((item, index) => (
                  <li key={item.domain} className="flex justify-between w-64 mx-auto">
                    <span>{index + 1}. {item.domain}</span>
                    <span className="font-semibold">{item.count}</span>
                  </li>
                ))}
              </ul>
            <button
              onClick={() => setSlide("slide2_intro")}
              className="mt-8 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Next →
            </button>
            </div>
          )}
        </Slide>
      )}

      {slide === "slide2_intro" && (
        <Slide>
          <p className="font-['DynaPuff'] text-2xl mb-6">
            Ever wonder about your browsing habits?
          </p>
        </Slide>
      )}

      {slide === "slide2" && cleanedData.length > 0 && (
        <Slide>
          <h1 className="text-4xl font-bold mb-4">Your Peak Browsing Hour</h1>

          <p className="text-2xl font-semibold">
            {formatHour(VisitHour(cleanedData)[0].hour)}
          </p>

          <p className="text-xl text-gray-600 mt-2 mb-8">
            {VisitHour(cleanedData)[0].count} visits
          </p>

          {delay && ( 
            <div style={{ animation: "fadeIn 0.8s ease" }}> 
        
            <p className="text-lg text-gray-500 mt-4">
              {getHourComment(VisitHour(cleanedData)[0].hour)}
            </p>

            <button
              onClick={() => setSlide("slide3_intro")}
              className="mt-8 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
              Next →
            </button>
             </div> )}
          
        </Slide>
      )}

      {slide === "slide3_intro" && (
        <Slide>
          <p className="font-['DynaPuff'] text-2xl mb-6">
            We can delve in even deeper...
          </p>
        </Slide>
      )}

      {slide === "slide3" && cleanedData.length > 0 && (
        <Slide>
          <h1 className="text-4xl font-bold mb-4">Your Most Active Day of the Week</h1>

          <p className="text-2xl font-semibold">
            {formatDayOfWeek(VisitDayofWeek(cleanedData)[0].day)}
          </p>

          <p className="text-xl text-gray-600 mt-2 mb-4">
            {VisitDayofWeek(cleanedData)[0].count} visits
          </p>

          {delay && (
            <>
            <p
              className="text-lg text-gray-500 mt-4"
              style={{ animation: "fadeIn 0.8s ease" }}
            >
              Looks like this is your prime browsing day.
            </p>

          <button
          onClick={() => setSlide("slide4_intro")}
          className="mt-10 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
          Next →
          </button>
          </>
          )}
        </Slide>
      )}

      {slide === "slide4_intro" && (
        <Slide>
          <p className="font-['DynaPuff'] text-2xl mb-6">
            And finally...
          </p>
        </Slide>
      )}

      {slide === "slide4" && cleanedData.length > 0 && (
        <Slide>
          <h1 className="text-4xl font-bold mb-4">The day you were most active was</h1>

          <p className="text-2xl font-semibold">
            {formatDate(VisitDay(cleanedData)[0].date)}
          </p>

          <p className="text-xl text-gray-600 mt-2 mb-4">
            where you made {VisitDay(cleanedData)[0].count} visits!
          </p>

          {delay && (
            <>
            <p
              className="text-lg text-gray-500 mt-4"
              style={{ animation: "fadeIn 0.8s ease" }}
            >
              Find anything interesting?
            </p>

            <button
            onClick={() => setSlide("slide5")}
            className="mt-10 px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition"
            >
            End →
            </button>
            </>
          )}

          
        </Slide>
      )}

      {slide === "slide5" && cleanedData.length > 0 && (
        <Slide>
          <h1 className="text-4xl font-bold mb-6">Your Browser Wrapped</h1>

          {(() => {
            const topDomain = VisitedDomains(cleanedData)[0];
            const peakHour = VisitHour(cleanedData)[0];
            const peakDay = VisitDayofWeek(cleanedData)[0];
            const peakDate = VisitDay(cleanedData)[0];

            return (
              <>
                <ul className="text-xl space-y-3">
                  <li>
                    <strong>Most visited domain:</strong> {topDomain.domain}
                  </li>
                  <li>
                    <strong>Peak hour:</strong> {formatHour(peakHour.hour)}
                  </li>
                  <li>
                    <strong>Most active day:</strong> {formatDayOfWeek(peakDay.day)}
                  </li>
                  <li>
                    <strong>Most active date:</strong> {formatDate(peakDate.date)}
                  </li>
                </ul>

                {/* Delayed subtitle */}
                {delay && (
                  <p
                    className="text-lg text-gray-500 mt-6"
                    style={{ animation: "fadeIn 0.8s ease" }}
                  >
                    Hope you had fun!
                  </p>
                )}
              </>
            );
          })()}

        </Slide>
      )}
    </>
  );
  
}

export default App
