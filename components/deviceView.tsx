import styled, { css, keyframes } from 'styled-components'
import { Device } from '../lib/devices.graphql'
import { breakpoints } from './theme'

const Li = styled.li<Device>`
  background: #262626;
  display: inline-block;
  border-radius: 4px;
  padding: 10px;
  width: 200px;
  height: 300px;
  margin: 8px;
  vertical-align: top;
  text-align: center;
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75);
  color: white;
  transition: width 1s, height 1s;

  @media (max-width: ${breakpoints.smallMobile}) {
    width: 90%;
    height: 280px;
  }
  position: relative;
  ${({ status, online }) => {
    if (online) {
      if (status === 'on')
        return css`
          border: solid 1px #ebeb9e;
        `
      return css`
        /* box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75); */
        border: solid 1px gray;
      `
    }

    return css`
      color: gray;
      border: solid 1px #473f3f;
      box-shadow: none;
      top: 0px;
      left: 0px;
    `
  }};
`
const switchOn = keyframes`
        0% {     border: 4px solid gray;     }
        50% {
            /* background-color: yellow; */
            border: 18px solid #ebeb9e;
            transform: scale(1.4) translateX(-50%);
            /* width: 140px;
            height: 140px;
            bottom: 0px;
            left: 30px; */
        }
        100% {}
`
const switchOff = keyframes`
        0% { border: 8px solid #ebeb9e;  }
        50% {
            
            border: 25px solid gray;
            /* width: 140px;
            height: 140px;
            bottom: 0px;
            left: 30px; */
        }
        100% {}
`

const Button = styled.button<Device>`
  width: 100px;
  height: 100px;
  border-radius: 50%;

  vertical-align: middle;
  margin: 0px;
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform-origin: left;
  transform: translateX(-50%);
  /* transition: border s, color 10s; */
  background-color: transparent;
  ${({ status, online }) => {
    if (!status)
      return css`
        display: none;
      `
    if (online) {
      if (status === 'on')
        return css`
          border: 8px #ebeb9e solid;
          color: yellow;
          animation: 2s ${switchOn} ease-in-out;
        `
      if (status == 'off')
        return css`
          /* box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75); */
          color: silver;
          border: solid 4px gray;
          animation: 5s ${switchOff} ease-in-out;
        `
    }
    return css`
      background: transparent;
      /* box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.75); */
      color: black;
      border: solid 4px black;
    `
  }};
`

export const DeviceView: React.FC<Device> = (device) => {
  const { name, temperature, humidity, status } = device

  return (
    <Li {...device}>
      <div>
        {name} ({status})
        <br />
        {/* <button>Detail</button> */}
        <br />
        {temperature != null && <h1>{temperature}°</h1>}
        {humidity != null && <h1>{humidity}%</h1>}
        <br />
        {/* <br/><small>{deviceId}</small> */}
      </div>
      <Button {...device}>{status}</Button>
    </Li>
  )
}
