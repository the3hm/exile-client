import React from 'react';
import { Line, Circle } from 'rc-progress';
import styled from 'styled-components';
import { colors } from './theme';

export default ({ attributes, exp, targetBar, target }) => {

  const { health = { current: 0, max: 1 }, mana = { current: 0, max: 1 }, stamina = { current: 0, max: 1 } } = attributes || {};

  return (
    <StatBarContainer>

      <BarContainer>
        <Bar current={health && health.current || 0} max={health && health.max || 1} attribute='health' height={targetBar ? '62px' : '40px'} />
        {!targetBar && exp && <Bar current={exp.current} max={exp.max} height='5px' attribute='exp' />}
        {!targetBar && <Bar current={mana.current} max={mana.max} height='11px' attribute='mana' />}
        {!targetBar && <Bar current={stamina.current} max={stamina.max} height='11px' attribute='stamina' />}
      </BarContainer>

      <AttributeContainer>
        {targetBar && target.name &&
          <>
            <AttributeAmount attribute='stamina'>
              {target.level} {target.class}
            </AttributeAmount>
            <AttributeAmount attribute='mana' overflowText>
              {target.name}
            </AttributeAmount>
            <AttributeAmount amount={health} attribute='health'>
              {health.current.toLocaleString()} hp
            </AttributeAmount>
          </>
        }

        {!targetBar &&
          <>
            <AttributeAmount amount={health} attribute='health'>
              {health.current.toLocaleString()} hp
            </AttributeAmount>
            <AttributeAmount amount={mana} attribute='mana'>
              {mana.current.toLocaleString()} mn
            </AttributeAmount>
            <AttributeAmount amount={stamina} attribute='stamina'>
              {stamina.current.toLocaleString()} st
            </AttributeAmount>
          </>
        }
      </AttributeContainer>

    </StatBarContainer>
  )
}

const StatBarContainer = styled.div`
  width: 100%;
  max-width: 380px;
  height: 95px;
  background: black;
  /* background: rgba(0, 0, 0, 0.6); */

  /* height: 130px; */
  /* padding: 0 15px; */
  /* margin: 0 15px; */
  /* padding-top: 5px; */
  /* margin-top: 5px; */
  border-radius: 4px;
  border: 5px black solid;
  border-left: 15px black solid;
  border-right: 15px black solid;
  display: flex;
  flex-flow: column;
  /* align-items: flex-start; */
  /* justify-content: center; */
`;

const BarContainer = styled.div`
  /* padding: 0 10px; */
  /* border-right: 1px solid white;
  border-left: 1px solid white; */
`;

const Bar = ({ current, max, attribute, height, width }) => {
  return (
    <div style={{ height: height || '40px', width: width || '100%', padding: '2px 0px' }}>
      <Line percent={current / max * 100}
        strokeWidth="25"
        trailWidth="25"
        trailColor={colors[`${attribute}Dark`]}
        strokeColor={colors[attribute] || 'white'}
        strokeLinecap="butt"
      />
    </div>
  )
};

const AttributeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background: rgba(0, 0, 0, .5); */
  height: 25px;
  padding: 0px 10px;
`;

const AttributeAmount = styled.div`
  color: ${props => colors[props.attribute] || 'white'};
  height: 100%;
  flex: ${({ overflowText }) => overflowText ? '1 1 auto' : '0 0 auto'};
  ${({ overflowText }) => overflowText && 'padding: 0px 3px'};
  text-align: center;
`;


// <Amount> {current.toLocaleString()}</Amount>
// If we want the #s on the bars themselves, this will do that.
const Amount = styled.div`
color: black;
font-size: 1.5em;
position: absolute;
display: inline-block;
right: 0;
transform: translateY(-55%);
padding: 0 15px;
top: 50%;
font-weight: 500;
`;