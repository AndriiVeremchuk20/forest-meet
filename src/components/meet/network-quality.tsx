import {useNetworkQuality} from "agora-rtc-react"

export const NetworkQuality = () => {
	
 	const networkQuality = useNetworkQuality();

    const updateNetworkStatus = () => {
    const networkLabels = {
      0: 'Unknown', 1: 'Excellent',
      2: 'Good', 3: 'Poor',
      4: 'Bad', 5: 'Very Bad',
      6: 'No Connection'
    }

    return <label>Network Quality: {networkLabels[networkQuality.uplinkNetworkQuality]}</label>;
  };

	return <div className="w-full flex justify-center">{updateNetworkStatus()}</div>
}

