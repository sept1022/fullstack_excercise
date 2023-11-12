import StatisticsApp from "./exercises/StatisticsApp";
import AnecdotesApp from "./exercises/AnecdotesApp";
import NoteApp from "./exercises/NoteApp";
import CourseApp from "./exercises/CourseApp";
import PhoneBookApp from "./exercises/PhoneBookApp";
import CurrencyApp from './exercises/CurrencyApp';
// import CountryInfoApp from './exercises/CountryInfoApp';

//mongodb+srv://sept102:<password>@cluster0.xtirf0a.mongodb.net/?retryWrites=true&w=majority
const App = () => {
  return (
    <div>
      {/*<StatisticsApp />*/}
      {/*<AnecdotesApp />*/}
      {/*<CourseApp />*/}
      {/*<CurrencyApp />*/}
      {/*<CountryInfoApp />*/}
      {/*<PhoneBookApp />*/}
      <NoteApp />
    </div>
  )
}

export default App
