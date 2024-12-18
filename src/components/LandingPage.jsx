import image from "/src/assets/notesImage.png"
const LandingPage = () => {
  return (
    <div className=" mt-10 flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold text-purple-500 mb-12">Welcome to NoteHub</h1>
      <img src={image} alt='notes-image' className='w-50 mb-6' />
      <header className="text-center mb-8">
        <p className=" text-2xl font-bold text-gray-600">Your secure place for storing personal notes.</p>
        <p className='text-lg font-semibold'> Join thousands of users who organize their thoughts with Notevo. Start your free trial today!</p>
      </header>
    </div>
  );
};

export default LandingPage;
