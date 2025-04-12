export const getBackgroundColor = (temp) => {
    const colors = {
      "-60": "#dce9fa",
      "-55": "#d3e2f7",
      "-50": "#cbdbf4",
      "-45": "#c0d4ef",
      "-40": "#b8cdea",
      "-35": "#afc6e6",
      "-30": "#a7bfe3",
      "-25": "#9cb8df",
      "-20": "#94b0d5",
      "-15": "#87a5d0",
      "-10": "#7e9bc2",
      "-5": "#7790b8",
      "0": "#607ba6",
      "5": "#56719c",
      "10": "#4d6591",
      "15": "#405d88",
      "20": "#39517b",
      "25": "#2f4775",
      "30": "#254370",
      "35": "#264e77",
      "40": "#295b80",
      "45": "#296689",
      "50": "#287494",
      "55": "#428190",
      "60": "#648d89",
      "65": "#879a84",
      "70": "#aba87d",
      "75": "#c2ab75",
      "80": "#c39c61",
      "85": "#c38a53",
      "90": "#bd704d",
      "95": "#ae4d4b",
      "100": "#9d2a4c",
      "105": "#8b1d40",
      "110": "#711431",
      "115": "#570c25",
      "120": "#3e0216",
    };
  
    const keys = Object.keys(colors).sort((a, b) => a - b);
    let color = "";
    
    if (temp <= -60) {
      color = colors[keys[0]];
    } else if (temp >= 120) {
      color = colors[keys[keys.length - 1]];
    } else {
      for (let i = 0; i < keys.length; i++) {
        if (temp >= keys[i] && temp < keys[i + 1]) color = colors[keys[i]];
      }
    }
    
    document.body.style.background = `radial-gradient(ellipse at center, ${color} 0%, #000000 100%)`;
  };
  
  export const getFormattedDate = (timezoneOffset) => {
    const cDate = new Date();
    const utc = cDate.getTime() + (cDate.getTimezoneOffset() * 60000);
    const localDate = new Date(utc + (1000 * timezoneOffset));
    
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    
    return localDate.toLocaleString("en-US", options);
  };
  
  export const getAQIDescription = (aqi) => {
    switch (aqi) {
      case 1:
        return 'Good (0-50)';
      case 2:
        return 'Fair (51-100)';
      case 3:
        return 'Moderate (101-150)';
      case 4:
        return 'Poor (151-200)';
      case 5:
        return 'Very Poor (201+)';
      default:
        return 'Unknown';
    }
  };