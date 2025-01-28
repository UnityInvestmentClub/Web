import './PriceZones.css';
import { BsFillCaretDownFill } from "react-icons/bs";
import { SSG, PropsBase } from '@_types/';


interface PriceZoneProps extends PropsBase {
  ssg: SSG
}

export const PriceZones = ({ ssg, className = '' }: PriceZoneProps) => {
  const { fcTotalAnnualReturn, lowEndHoldThreshold, highEndHoldThreshold } = ssg;
  
  const isValidSSG = !!ssg.fcTotalAnnualReturn[1];

  const isBuy = isValidSSG ? fcTotalAnnualReturn[1] >= lowEndHoldThreshold : false;
  const isHold = isValidSSG ? fcTotalAnnualReturn[1] > highEndHoldThreshold && fcTotalAnnualReturn[1] < lowEndHoldThreshold : false;
  const isSell = isValidSSG ? fcTotalAnnualReturn[1] <= highEndHoldThreshold : false;

  return (
    <div
      className={`price-zones ${className}`}
      style={{
        paddingTop: !isValidSSG ? '36px' : '0px'
      }}
    >
      <div
        className='pointer-col'
        style={{
          height: !isValidSSG ? '0px' : '36px',
          marginLeft: isSell ? '300px' : '',
          marginRight: isBuy ? '300px' : ''
        }}
      >
        {!!ssg.currentStockPrice && <p>${ssg.currentStockPrice}</p>}
        <BsFillCaretDownFill
          className='pointer'
        />
      </div>
      <div className='zones'>
        <div className={`zone buy ${isBuy ? 'active' : ''}`}>BUY</div>
        <div className={`zone hold ${isHold ? 'active' : ''}`}>HOLD</div>
        <div className={`zone sell ${isSell ? 'active' : ''}`}>SELL</div>
      </div>
    </div>
  );
};