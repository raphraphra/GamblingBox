import Clicker from "./Clicker"
import Counter from "./Counter"
import GeneralUpgrade from "./GeneralUpgrade"
import Header from "./Header"
import Gamble from "./Gamble"

function App() {
  
  return (
    <>
    <Header />
      <div className="wrapper">
        <section>
          <Counter/>
          <Clicker />
        </section>
        <section>
          <Gamble/>
        </section>
        <div className='upgrade-box'>
          <GeneralUpgrade name='Players' baseprice={10} rate={1.9} urate = {1.5} basegain={2}/>
          <GeneralUpgrade name='Casinos' baseprice={360} rate={3.5} urate = {2.5} basegain={50}/>
          <GeneralUpgrade name='Shady Grannies' baseprice={1250} rate={5} urate={3} basegain={540} />
          </div>
      </div>
    </>
    

  )
}

export default App
