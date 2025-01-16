import './PriceZones.css';
import { FaCaretDown } from "react-icons/fa";
import { SSG, PropsBase } from '@_types/';


interface PriceZoneProps extends PropsBase {
  ssg: SSG
}

export const PriceZones = ({ ssg, className }: PriceZoneProps) => {
  var isBuy = ssg.fcTotalAnnualReturn[1] >= .12;
  var isHold = ssg.fcTotalAnnualReturn[1] > .05 && ssg.fcTotalAnnualReturn[1] < .12;
  var isSell = ssg.fcTotalAnnualReturn[1] <= .05;

  return (
    <div className={`price-zones ${className}`} style={{ paddingTop: !ssg.fcTotalAnnualReturn[1] ? '20px' : '0px', transition: 'padding-top .5s ease' }}>
      <FaCaretDown
        className='pointer'
        style={{
          height: !ssg.fcTotalAnnualReturn[1] ? '0px' : '20px',
          marginLeft: isSell ? '300px' : '',
          marginRight: isBuy ? '300px' : '',
          transition: 'all .5s ease'
        }}
      />
      <div className='zones'>
        <div className={`zone ${isBuy ? 'buy-active' : 'buy'}`}>BUY</div>
        <div className={`zone ${isHold ? 'hold-active' : 'hold'}`}>HOLD</div>
        <div className={`zone ${isSell ? 'sell-active' : 'sell'}`}>SELL</div>
      </div>
    </div>
  );
};