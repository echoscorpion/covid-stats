import React, {useState, useEffect} from 'react'
import axios from "axios"

export default function Covstat() {    

    const [covidData, setcovidData] = useState([])
    // const [resultOutput, setresultOutput] = useState([])
    const [selectedValue, setselectedValue] = useState()
    const [dischargedCases, setdischargedCases] = useState()
    const [deaths, setdeaths] = useState()
    const [indianOriginCases, setindianOriginCases] = useState()
    const [foreignOriginCases, setforeignOriginCases] = useState()
    const [totalCases, settotalCases] = useState()



    useEffect(() => {

        const getCovidData = async (e) => {
            const getUrl = `https://api.rootnet.in/covid19-in/stats/latest`
            axios.get(getUrl)
            .then(resp => {setcovidData(resp.data.data.regional);})
            .catch(e => {console.log(e);});
        };

        getCovidData()

    })

    const slectedValueChanged = (event)=>{
        event.preventDefault();
        let selectedState = document.getElementById("SelectState");
        let selectedValue = selectedState.value;
        setselectedValue(selectedValue)
       
    }

    const getSelectedData = async (event) =>{
        event.preventDefault();
       

        for (let i=0; i<covidData.length; i++){
            if (covidData[i].loc === selectedValue){

                for (let j=0 ; j<Object.keys(covidData[i]).length;j++) {
                    console.log("selected state is " + covidData[i].loc+" test2")
                    setdischargedCases(covidData[i].discharged.toLocaleString())
                    setindianOriginCases(covidData[i].confirmedCasesIndian.toLocaleString())
                    setforeignOriginCases(covidData[i].confirmedCasesForeign.toLocaleString())
                    settotalCases(covidData[i].totalConfirmed.toLocaleString())
                    setdeaths(covidData[i].deaths.toLocaleString())


                    break
                }
                // console.log(selectedValue+"test1")

            }
        }
    }  

  return (
    
    <>
        <div className="container p-md-5 pb-5">
            <div className="row">
                <div className="col-md-6 col-12 my-auto">
                    <div className="row">
                        <div className="col-12">
                        <h1 className="title pt-5 pt-md-0">
                            Covid Case Statistics
                        </h1>
                        <p className="desc">
                           <b> Get details of number covid cases in India</b>
                        </p>

                        <p className="desc">
                        Coronavirus disease (COVID-19) is an infectious disease caused by the SARS-CoV-2 virus.
                        Most people who fall sick with COVID-19 will experience mild to moderate symptoms and recover without special treatment. However, some will become seriously ill and require medical attention.
                        </p>
                    </div>
                    <div className="col-12 w-75 pt-4">
                        <form onSubmit={getSelectedData}>
                            <div className="mb-3">
                                <select className="form-select" aria-label="Default select example" name="SelectState" id="SelectState" onChange={slectedValueChanged}>
                                    <option value="Select State" key="Select-state">Select State</option>
                                    {covidData.map(({loc})=>(
                                        <option value={loc} key={loc.trim()}>{loc}</option>
                                    ))
                                    }
                                </select>
                            </div>
                            <button type="submit" className="btn">Get Data</button>
                        </form>
                        
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12 pt-5 pt-md-5 ps-md-5 my-auto">
                    <h3 className='text-light ps-md-5 pb-3'>{selectedValue ? `Number of casses in ${selectedValue}` :"Please select State"}</h3>
                    <div className="resultCard ps-md-5">
                        <div className="card">
                            <div className="cardTttl">
                            Indian Confirmed Cases
                            </div>
                            <p className="result">
                                {indianOriginCases}
                            </p>
                        </div>
                        <div className="card">
                            <div className="cardTttl">
                            Foreign Confirmed Cases
                            </div>
                            <p className="result">
                                {foreignOriginCases}
                            </p>
                        </div>
                        <div className="card">
                            <div className="cardTttl">
                            Discharged
                            </div>
                            <p className="result">
                                {dischargedCases}
                            </p>
                        </div>
                        <div className="card">
                            <div className="cardTttl">
                            Deaths
                            </div>
                            <p className="result">
                                {deaths}
                            </p>
                        </div>
                        <div className="card">
                            <div className="cardTttl">
                            Total Confirmed
                            </div>
                            <p className="result">
                                {totalCases}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    </>
  )
}
