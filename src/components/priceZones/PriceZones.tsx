import './PriceZones.css';
import { FaCaretDown } from "react-icons/fa";
import { SSG, PropsBase } from '@_types/';


interface PriceZoneProps extends PropsBase {
  ssg: SSG
}

export const PriceZones = ({ ssg, className }: PriceZoneProps) => {
  const { fcTotalAnnualReturn, lowEndHoldThreshold, highEndHoldThreshold } = ssg;
  
  const isValidThreshold = (lowEndHoldThreshold >= highEndHoldThreshold)

  const isBuy = isValidThreshold ? fcTotalAnnualReturn[1] >= lowEndHoldThreshold : false;
  const isHold = isValidThreshold ? fcTotalAnnualReturn[1] > highEndHoldThreshold && fcTotalAnnualReturn[1] < lowEndHoldThreshold : false;
  const isSell = isValidThreshold ? fcTotalAnnualReturn[1] <= highEndHoldThreshold : false;

  return (
    <div
      className={`price-zones ${className}`}
      style={{
        paddingTop: (!ssg.fcTotalAnnualReturn[1] || !isValidThreshold) ? '20px' : '0px',
          transition: 'padding-top .5s ease'
      }}
    >
      <FaCaretDown
        className='pointer'
        style={{
          height: (!ssg.fcTotalAnnualReturn[1] || !isValidThreshold) ? '0px' : '20px',
          marginLeft: isSell ? '300px' : '',
          marginRight: isBuy ? '300px' : '',
          transition: 'all .5s ease'
        }}
      />
      <div className='zones'>
        <div className={`zone buy ${isBuy ? 'active' : ''}`}>BUY</div>
        <div className={`zone hold ${isHold ? 'active' : ''}`}>HOLD</div>
        <div className={`zone sell ${isSell ? 'active' : ''}`}>SELL</div>
      </div>
    </div>
  );
};