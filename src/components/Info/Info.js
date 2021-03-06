import Chart from '../Chart/Chart';
import './Info.css';

export default function Info({
    currency,
    distance,
    data
}){

    //numberWithCommas:
    const numberWithCommas = (number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    //getPerDistance:
    const getPerDistance = () => {
        return numberWithCommas(Number(data.perDistance < 0 ? -data.perDistance : data.perDistance).toFixed(2))
    }

    //getPerTime:
    const getPerTime = (value) => {
        return numberWithCommas(value < 0 ? -value : value);
    }

    //setDefaultData:
    const getDefaultData = () => {
        return {
            perDistance: '0.00',
            daily:       '00.0',
            monthly:     '00',
            yearly:      '00',
            chart: [
                { name: 'Dep', title: 'Depreciation'           , value: 0 },
                { name: 'T&I', title: 'Tax & Insurance'        , value: 0 },
                { name: 'W&M', title: 'Warranty & Maintenance' , value: 0 },
                { name: 'Ser', title: 'Service'                , value: 0 },
                { name: 'Fue', title: 'Fuel'                   , value: 0 },
            ]
        }
    }

    //startup:
    if(data === null)
        data = getDefaultData();
    
    //render:
    return (
        <div className='Info'>
            <div className='container'>

                {/* title */}
                <div className='titleWrapper'>
                    <div className='smallText'>
                        <a className='your'>Your</a>
                        <a className='ownership'>ownership</a>
                    </div>
                    <div className='bigText'>
                        <a className={'costs ' + (data.perDistance >= 0 ? '' : 'benefits')}>
                            {data.perDistance >= 0 ? 'costs' : 'benefits'}
                        </a>
                        <a className='willBe'>will be</a>
                    </div>
                </div>

                {/* per distance */}
                <div className='perDistanceWrapper'>
                    <a className='unit'>{currency[1]}</a>
                    <a className='amount' title={getPerDistance()}>{getPerDistance()}</a>
                    <a className='period'>per {distance[0].toLowerCase()}</a>
                </div>

                {/* per time */}
                <div className='perTimeWrapper'>
                    <div className='timeCostWrapper'>
                        <a className='period'>daily</a>
                        <div className='amountWrapper'>
                            <a className='currency'>{currency[1]}</a>
                            <a className='amount' title={getPerTime(data.daily)}>{getPerTime(data.daily)}
                            </a>
                        </div>
                    </div>
                    <div className='timeCostWrapper'>
                        <a className='period'>monthly</a>
                        <div className='amountWrapper'>
                            <a className='currency'>{currency[1]}</a>
                            <a className='amount' title={getPerTime(data.monthly)}>{getPerTime(data.monthly)}</a>
                        </div>
                    </div>
                    <div className='timeCostWrapper'>
                        <a className='period'>yearly</a>
                        <div className='amountWrapper'>
                            <a className='currency'>{currency[1]}</a>
                            <a className='amount' title={getPerTime(data.yearly)}>{getPerTime(data.yearly)}</a>
                        </div>
                    </div>
                </div>

                {/* chart */}
                <div className='chartWrapper'>
                    <Chart currency = {currency} data = {data.chart}/>
                </div>
            </div>
        </div>
    )

}