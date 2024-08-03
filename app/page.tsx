import ProfileManager from "@/components/ProfileManager";

const Homepage = () => {
    return (
        <div
            className="flex flex-col items-center min-h-screen 
            bg-gradient-to-br from-gray-50 to-gray-200 py-12 px-4">
            <ProfileManager />
        </div>
    );
};

export default Homepage;
