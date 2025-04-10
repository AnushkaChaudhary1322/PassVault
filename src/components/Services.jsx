import React from "react";

const Services = () => {
const services = [
{
    title: "Team Customization",
    description: "Create and edit custom teams by choosing countries and setting your own playing 11.",
    image: "https://cdn-icons-png.flaticon.com/512/854/854866.png",
},
{
    title: "Live Match Scoreboard",
    description: "Keep track of runs, wickets, and overs in real time — perfect for local or friendly matches.",
    image: "https://cdn-icons-png.flaticon.com/512/1055/1055687.png",
},
{
    title: "Player Stats Tracker",
    description: "View batting and bowling stats instantly — keep an eye on top performers throughout the match.",
    image: "https://static.vecteezy.com/system/resources/previews/005/656/591/original/bat-with-ball-concept-of-cricket-icon-vector.jpg",
},
];

return (
<div className="min-h-screen bg-gradient-to-br from-sky-950 to-sky-900 text-white px-6 py-12 flex items-center justify-center">
    <div className="max-w-6xl w-full">
    <h1 className="text-4xl font-extrabold text-center text-yellow-300 mb-12">
        🛠️ Our Services
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
        <div
            key={index}
            className="bg-sky-800 p-6 rounded-xl shadow-lg text-center transition-transform duration-300 transform hover:-translate-y-2 hover:shadow-xl"
        >
            <img
            src={service.image}
            alt={service.title}
            className="w-20 h-20 mx-auto mb-4 animate-fade-in"
            />
            <h3 className="text-2xl font-semibold text-emerald-300 mb-2">{service.title}</h3>
            <p className="text-white text-sm">{service.description}</p>
        </div>
        ))}
    </div>

    <p className="text-sm italic text-center text-white mt-12">
        More features coming soon
    </p>
    </div>
</div>
);
};

export default Services;
