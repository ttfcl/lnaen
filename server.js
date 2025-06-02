// server.js (2024.06 최적화)
// 단기/스윙/장기 전략별 종합점수 + 도넛차트 + 종합코멘트 + 지표별 코멘트 UI

const API_KEY = 'i7SNR4PCjuSPhvZRkagJAQjLRaZUC2aF'; // D5S8TWZ8WXN9BCKS
const STRATEGY = {
  단기: ['MA5','MA10','RSI2','RSI14','StochasticFast','CCI','ATR','VWAP','OBV','MFI'],
  스윙: ['MA20','MA60','Bollinger','MACD','RSI14','StochasticSlow','ADX','OBV','MFI'],
  장기: ['MA120','MA200','MACD','PPO','RSI14','Ichimoku','ROC','OBV']
};


// === 1. 23개 지표 점수/코멘트 함수 세트 ===
const INDICATOR_FULL_SET = [
  // 1. MA5 (단기이동평균선)
  {
    name: "MA5",
    key: "MA5",
    score: (v, close) => {
      if (v == null || close == null) return 0;
      const diff = close - v;
      if (diff > 3) return 100;
      if (diff > 1) return 80;
      if (diff > 0) return 60;
      if (diff > -1) return 40;
      if (diff > -3) return 20;
      return 0;
    },
    comment: (v, close) => {
      if (v == null || close == null) return "Short-term moving average data is not available. Please use for reference only.";
const diff = close - v;
if (diff > 3) return "The price is much higher than the recent average, indicating strong short-term upward momentum. Buying pressure is active.";
if (diff > 1) return "The price is above the short-term average, showing a continued positive trend. Investors are showing strong interest.";
if (diff > 0) return "The price is slightly above the short-term average. The trend is stable with no particular warning signs.";
if (diff > -1) return "The price is falling below the short-term average. It is advised to proceed with caution.";
return "The price is significantly below the short-term average, indicating a strong short-term downtrend. Be cautious with your investment.";

    }
  },

  // 2. MA10
  {
    name: "MA10",
    key: "MA10",
    score: (v, close) => {
      if (v == null || close == null) return 0;
      const diff = close - v;
      if (diff > 3) return 100;
      if (diff > 1) return 80;
      if (diff > 0) return 60;
      if (diff > -1) return 40;
      if (diff > -3) return 20;
      return 0;
    },
    comment: (v, close) => {
      if (v == null || close == null) return "10-day moving average data is not available.";
const diff = close - v;
if (diff > 3) return "The price is much higher than the 10-day average, indicating continued short-term strength. Recent buying pressure is strong.";
if (diff > 1) return "The price is above the 10-day average, reflecting a favorable short-term sentiment. The upward trend may continue.";
if (diff > 0) return "The price is above the 10-day average. No notable risk signals are observed.";
if (diff > -1) return "The price is slightly below the 10-day average. It’s wise to proceed with caution.";
return "The price is significantly below the 10-day average, indicating a strong short-term downtrend. Caution is advised.";

    }
  },

  // 3. MA20
  {
    name: "MA20",
    key: "MA20",
    score: (v, close) => {
      if (v == null || close == null) return 0;
      const diff = close - v;
      if (diff > 4) return 100;
      if (diff > 2) return 80;
      if (diff > 0) return 60;
      if (diff > -2) return 40;
      if (diff > -4) return 20;
      return 0;
    },
    comment: (v, close) => {
      if (v == null || close == null) return "20-day moving average data is not available.";
const diff = close - v;
if (diff > 4) return "The price is significantly above the 20-day average, indicating a strong medium-term trend. Steady buying is observed.";
if (diff > 2) return "The price is above the medium-term average, reflecting positive sentiment and investor expectations.";
if (diff > 0) return "The price is above the medium-term average. The trend appears stable.";
if (diff > -2) return "The price is falling below the medium-term average. It’s best to monitor the trend carefully.";
return "The price is well below the medium-term average, indicating a strong medium-term downtrend. Investment caution is advised.";

    }
  },

  // 4. MA60
  {
    name: "MA60",
    key: "MA60",
    score: (v, close) => {
      if (v == null || close == null) return 0;
      const diff = close - v;
      if (diff > 8) return 100;
      if (diff > 4) return 80;
      if (diff > 0) return 60;
      if (diff > -4) return 40;
      if (diff > -8) return 20;
      return 0;
    },
    comment: (v, close) => {
      if (v == null || close == null) return "60-day moving average data is not available.";
const diff = close - v;
if (diff > 8) return "The price is far above the 60-day average, indicating a very strong long-term uptrend. A stable rise is ongoing.";
if (diff > 4) return "The price is above the long-term average, which is a positive signal. Investor interest is increasing.";
if (diff > 0) return "The price is above the long-term average. The trend appears stable.";
if (diff > -4) return "The price is falling below the long-term average. It’s important to watch the trend closely.";
return "The price is significantly below the long-term average, indicating a strong long-term downtrend. Be cautious when investing.";

    }
  },

  // 5. MA120
  {
    name: "MA120",
    key: "MA120",
    score: (v, close) => {
      if (v == null || close == null) return 0;
      const diff = close - v;
      if (diff > 12) return 100;
      if (diff > 6) return 80;
      if (diff > 0) return 60;
      if (diff > -6) return 40;
      if (diff > -12) return 20;
      return 0;
    },
    comment: (v, close) => {
      if (v == null || close == null) return "120-day moving average data is not available.";
const diff = close - v;
if (diff > 12) return "The price is far above the 120-day average, indicating a very strong long-term trend. A stable growth phase is ongoing.";
if (diff > 6) return "The price is above the long-term average, which is a positive signal. Investor interest is growing.";
if (diff > 0) return "The price is above the long-term average. The trend is steady.";
if (diff > -6) return "The price is falling below the long-term average. Keep an eye on the trend.";
return "The price is significantly below the long-term average, suggesting a strong long-term downtrend. Exercise caution when investing.";

    }
  },

  // 6. MA200
  {
    name: "MA200",
    key: "MA200",
    score: (v, close) => {
      if (v == null || close == null) return 0;
      const diff = close - v;
      if (diff > 15) return 100;
      if (diff > 8) return 80;
      if (diff > 0) return 60;
      if (diff > -8) return 40;
      if (diff > -15) return 20;
      return 0;
    },
    comment: (v, close) => {
      if (v == null || close == null) return "200-day moving average data is not available.";
const diff = close - v;
if (diff > 15) return "The price is significantly above the 200-day average, indicating a very strong long-term uptrend. The growth trend appears stable.";
if (diff > 8) return "The price is above the long-term average, which is a positive signal. Long-term investors may view this favorably.";
if (diff > 0) return "The price is above the long-term average. The trend is stable.";
if (diff > -8) return "The price is below the long-term average. Cautious approach is recommended.";
return "The price is well below the 200-day average, indicating a strong long-term downtrend. Caution is advised for investors.";

    }
  },

  // 7. RSI2
  {
    name: "RSI(2)",
    key: "RSI2",
    score: (v) => {
      if (v == null) return 0;
      if (v > 80) return 0;
      if (v > 70) return 20;
      if (v > 60) return 40;
      if (v > 40) return 60;
      if (v > 20) return 80;
      return 100;
    },
    comment: (v) => {
      if (v == null) return "RSI(2) data is not available.";
if (v > 80) return "The price has risen too much in the short term and a pullback may occur. There is excessive short-term buying pressure.";
if (v > 70) return "The price has climbed significantly and may take a short-term pause. Caution is advised for short-term trades.";
if (v > 60) return "The uptrend is continuing. Market sentiment is positive.";
if (v > 40) return "No particular signals. The market is in a stable range.";
if (v > 20) return "The price has dropped significantly. A short-term rebound is possible.";
return "There has been heavy selling, and a short-term rebound may occur. The price is in an extremely low zone.";

    }
  },

  // 8. RSI14
  {
    name: "RSI(14)",
    key: "RSI14",
    score: (v) => {
      if (v == null) return 0;
      if (v > 80) return 0;
      if (v > 70) return 20;
      if (v > 60) return 40;
      if (v > 40) return 60;
      if (v > 20) return 80;
      return 100;
    },
    comment: (v) => {
      if (v == null) return "RSI(14) data is not available.";
if (v > 80) return "Heavy buying has pushed the price into an overheated zone. A short-term correction is possible.";
if (v > 70) return "Buying pressure is strong, but a pullback may occur.";
if (v > 60) return "The uptrend continues. This is a positive signal.";
if (v > 40) return "Typical movement. No significant signals.";
if (v > 20) return "The price has dropped significantly, which may present a buying opportunity.";
return "Heavy selling has driven the price very low. This could be a rebound signal.";

    }
  },

  // 9. MACD
  {
    name: "MACD",
    key: "MACD",
    score: (v) => {
      if (v == null) return 0;
      if (v > 2) return 100;
      if (v > 1) return 80;
      if (v > 0) return 60;
      if (v > -1) return 40;
      if (v > -2) return 20;
      return 0;
    },
    comment: (v) => {
      if (v == null) return "MACD data is not available.";
if (v > 2) return "A strong bullish signal has appeared. Market sentiment is very positive.";
if (v > 1) return "The upward trend is continuing. This is a positive signal.";
if (v > 0) return "There is an upward trend, but it is not strong. The market is in a neutral zone.";
if (v > -1) return "A downward trend is emerging. Caution is advised.";
return "A strong bearish signal has appeared. Be cautious with your investments.";

    }
  },

  // 10. PPO
  {
    name: "PPO",
    key: "PPO",
    score: (v) => {
      if (v == null) return 0;
      if (v > 1.5) return 100;
      if (v > 1) return 80;
      if (v > 0) return 60;
      if (v > -1) return 40;
      if (v > -1.5) return 20;
      return 0;
    },
    comment: (v) => {
      if (v == null) return "PPO data is not available.";
if (v > 1.5) return "A clear bullish signal has appeared. The investment environment is favorable.";
if (v > 1) return "The upward trend is continuing. The overall sentiment is moderately positive.";
if (v > 0) return "There is a weak bullish signal. Please use this for reference only.";
if (v > -1) return "A downward trend is forming. Caution is needed.";
return "A strong bearish signal has appeared. Be cautious with your investment decisions.";

    }
  },

  // 11. Bollinger Bands (볼린저밴드)
  {
    name: "Bollinger",
    key: "Bollinger",
    score: (v, upper, lower) => {
      if (v == null || upper == null || lower == null) return 0;
      if (v > upper) return 100;
      if (v > (upper + lower)/2) return 80;
      if (v > lower) return 60;
      if (v === lower) return 40;
      return 0;
    },
    comment: (v, upper, lower) => {
      if (v == null || upper == null || lower == null) return "Bollinger Bands data is not available.";
if (v > upper) return "The price is outside the normal range, indicating strong upward momentum. However, it may also signal overheating—caution is needed.";
if (v > (upper + lower) / 2) return "The price is above the midline, showing a healthy uptrend. Market sentiment is positive.";
if (v > lower) return "The price is moving within the band. No special signals at this time.";
if (v === lower) return "The price has touched the lower band. A continued downtrend is possible, so caution is advised.";
return "The price has dropped significantly below the normal range. A rebound may occur, but the downtrend remains a risk.";

    }
  },

  // 12. OBV (On Balance Volume, 거래량)
  {
    name: "OBV",
    key: "OBV",
    score: (v) => {
      if (v == null) return 0;
      if (v > 1000000) return 100;
      if (v > 500000) return 80;
      if (v > 0) return 60;
      if (v > -500000) return 40;
      if (v > -1000000) return 20;
      return 0;
    },
    comment: (v) => {
      if (v == null) return "On Balance Volume (OBV) data is not available.";
if (v > 1000000) return "There is strong buying pressure with highly active trading. Market sentiment is very positive.";
if (v > 500000) return "Many investors are buying the stock. The investment atmosphere is optimistic.";
if (v > 0) return "Buying and selling are relatively balanced. Trading activity is normal.";
if (v > -500000) return "Selling pressure is gradually increasing. Caution is recommended.";
return "Selling pressure has significantly increased, and market sentiment is weakening. Be careful.";

    }
  },

  // 13. MFI (Money Flow Index, 자금흐름)
  {
    name: "MFI",
    key: "MFI",
    score: (v) => {
      if (v == null) return 0;
      if (v > 80) return 0;
      if (v > 70) return 20;
      if (v > 60) return 40;
      if (v > 40) return 60;
      if (v > 20) return 80;
      return 100;
    },
    comment: (v) => {
      if (v == null) return "Money Flow Index (MFI) data is not available.";
if (v > 80) return "Too much money is flowing into the market, indicating an overheated condition. A short-term correction may follow.";
if (v > 70) return "A large amount of money is entering the stock. The investment sentiment is very strong.";
if (v > 60) return "Capital inflow is steady. The uptrend may continue.";
if (v > 40) return "There is no significant inflow or outflow of funds. Market movement is stable.";
if (v > 20) return "Funds are slowly flowing out of the stock. Caution is advised.";
return "A large outflow of funds is weakening market sentiment. Be careful.";

    }
  },

  // 14. CCI
  {
    name: "CCI",
    key: "CCI",
    score: (v) => {
      if (v == null) return 0;
      if (v > 200) return 100;
      if (v > 100) return 80;
      if (v > -100) return 60;
      if (v > -200) return 40;
      return 20;
    },
    comment: (v) => {
      if (v == null) return "Commodity Channel Index (CCI) data is not available.";
if (v > 200) return "The price has risen abnormally high, signaling a very strong bullish trend. Be cautious of a possible short-term correction.";
if (v > 100) return "The upward trend is clearly continuing. This is a positive signal.";
if (v > -100) return "The price is moving normally. No notable signals.";
if (v > -200) return "The price is declining and selling pressure is present. Approach with caution.";
return "The price has dropped excessively, indicating an oversold condition. A rebound may occur soon.";

    }
  },

  // 15. ADX
  {
    name: "ADX",
    key: "ADX",
    score: (v) => {
      if (v == null) return 0;
      if (v > 40) return 100;
      if (v > 30) return 80;
      if (v > 20) return 60;
      if (v > 10) return 40;
      if (v > 0) return 20;
      return 0;
    },
    comment: (v) => {
      if (v == null) return "Average Directional Index (ADX) data is not available.";
if (v > 40) return "There is very strong directional momentum. Market strength is clearly evident.";
if (v > 30) return "The strength of the trend, either upward or downward, is quite strong. A clear direction is forming.";
if (v > 20) return "Directional movement is starting to appear. It may be useful for investment decisions.";
if (v > 10) return "No clear direction yet. It's better to wait and observe.";
return "No significant market strength is detected. The trend is weak.";

    }
  },

  // 16. DMI
  {
    name: "DMI",
    key: "DMI",
    score: (v) => {
      if (v == null) return 0;
      if (v > 30) return 100;
      if (v > 20) return 80;
      if (v > 10) return 60;
      if (v > 5) return 40;
      if (v > 0) return 20;
      return 0;
    },
    comment: (v) => {
      if (v == null) return "Directional Movement Index (DMI) data is not available.";
if (v > 30) return "The market trend is very clear. A strong directional movement has formed.";
if (v > 20) return "Directional strength is increasing. This may be helpful for investment decisions.";
if (v > 10) return "The trend direction is still weak. It’s better to observe a bit longer.";
if (v > 5) return "No clear signals are present yet. Caution and patience are advised.";
return "No distinct market movement is currently visible.";

    }
  },

  // 17. ROC (Rate of Change)
  {
    name: "ROC",
    key: "ROC",
    score: (v) => {
      if (v == null) return 0;
      if (v > 10) return 100;
      if (v > 5) return 80;
      if (v > 0) return 60;
      if (v > -5) return 40;
      if (v > -10) return 20;
      return 0;
    },
    comment: (v) => {
      if (v == null) return "Rate of Change (ROC) data is not available.";
if (v > 10) return "The price is rising rapidly, indicating a strong bullish signal. Investor expectations are high.";
if (v > 5) return "The pace of the uptrend is accelerating. Market sentiment is positive.";
if (v > 0) return "The price is gradually increasing. The upward trend is steady.";
if (v > -5) return "The price is slightly declining. Volatility may increase, so caution is advised.";
return "The price is falling rapidly. Be cautious with your investments.";

    }
  },

  // 18. Ichimoku
  {
    name: "Ichimoku",
    key: "Ichimoku",
    score: (v, close) => {
      if (!v || close == null) return 0;
      // v: {base, conversion}
      if (close > v.base && close > v.conversion) return 100;
      if (close > v.base) return 80;
      if (close > v.conversion) return 60;
      if (close < v.base && close < v.conversion) return 20;
      return 40;
    },
    comment: (v, close) => {
      if (!v || close == null) return "Ichimoku Cloud data is not available.";
if (close > v.base && close > v.conversion) return "The current price is above all key lines, indicating strong overall bullish momentum.";
if (close > v.base) return "The price is above the base line, suggesting a potential uptrend.";
if (close > v.conversion) return "The price is near the turning line. It's better to wait for further confirmation of the trend.";
if (close < v.base && close < v.conversion) return "The price is below all key lines, clearly showing a bearish signal. Exercise caution.";
return "Directional signals are weak. It’s best to stay on the sidelines for now.";

    }
  },

  // 19. Stochastic Fast
  {
    name: "Stochastics fast",
    key: "StochasticFast",
    score: (v) => {
      if (v == null) return 0;
      if (v > 90) return 0;
      if (v > 80) return 20;
      if (v > 70) return 40;
      if (v > 30) return 60;
      if (v > 10) return 80;
      return 100;
    },
    comment: (v) => {
      if (v == null) return "Stochastics Fast data is not available.";
if (v > 90) return "Buying pressure is excessively high, and a short pause may follow. This is a short-term overbought signal.";
if (v > 80) return "Strong short-term buying momentum is present. A correction may occur.";
if (v > 70) return "The uptrend is continuing. This is a positive signal.";
if (v > 30) return "No significant signals. Market movement is neutral.";
if (v > 10) return "A rebound signal may appear from the bottom. Investor attention is needed.";
return "Selling pressure is very strong. A rebound could be expected soon.";

    }
  },

  // 20. Stochastic Slow
  {
    name: "Stochastics slow",
    key: "StochasticSlow",
    score: (v) => {
      if (v == null) return 0;
      if (v > 90) return 0;
      if (v > 80) return 20;
      if (v > 70) return 40;
      if (v > 30) return 60;
      if (v > 10) return 80;
      return 100;
    },
    comment: (v) => {
      if (v == null) return "Stochastics Slow data is not available.";
if (v > 90) return "The market is overheated in the mid-term. A pause or pullback may occur.";
if (v > 80) return "Buying pressure is strong. Be aware of a possible correction.";
if (v > 70) return "The upward trend is steadily continuing.";
if (v > 30) return "No significant signals. The trend is neutral.";
if (v > 10) return "The price is moving near the bottom. A rebound is expected.";
return "Selling pressure is strong, and a rebound may occur soon.";

    }
  },

  // 21. ATR (Average True Range)
  {
    name: "ATR",
    key: "ATR",
    score: (v) => {
      if (v == null) return 0;
      if (v > 4) return 0;
      if (v > 3) return 20;
      if (v > 2) return 40;
      if (v > 1) return 60;
      if (v > 0.5) return 80;
      return 100;
    },
    comment: (v) => {
      if (v == null) return "Average True Range (ATR) data is not available.";
if (v > 4) return "The price is highly volatile. It may be very risky for short-term trading.";
if (v > 3) return "Volatility is high, so caution is required. Be careful of sharp price swings.";
if (v > 2) return "There is considerable price movement. A cautious approach is recommended.";
if (v > 1) return "The price is moving within an average range. This is a generally stable zone.";
if (v > 0.5) return "Volatility is low, indicating a stable trend. The investment environment is relatively safe.";
return "The price is showing very stable movement. Risk level is low.";

    }
  },

  // 22. VWAP
  {
    name: "VWAP",
    key: "VWAP",
    score: (v, close) => {
      if (v == null || close == null) return 0;
      const diff = close - v;
      if (diff > 2) return 100;
      if (diff > 1) return 80;
      if (diff > 0) return 60;
      if (diff > -1) return 40;
      if (diff > -2) return 20;
      return 0;
    },
    comment: (v, close) => {
      if (v == null || close == null) return "VWAP data is not available.";
const diff = close - v;
if (diff > 2) return "The price is well above the VWAP, indicating strong upward momentum. Buying activity is high.";
if (diff > 1) return "The price is above the VWAP, reflecting a positive investment sentiment.";
if (diff > 0) return "The price is slightly above the VWAP. The uptrend is moderate and stable.";
if (diff > -1) return "The price is near the VWAP. Trend direction needs to be confirmed.";
return "The price is below the VWAP, showing weak investor sentiment. Exercise caution.";

    }
  },

  // 23. DMI (중복 방지용, DMI+ADX 구분 가능)
  {
    name: "DMI(보조지표)",
    key: "DMI",
    score: (v) => {
      if (v == null) return 0;
      if (v > 30) return 100;
      if (v > 20) return 80;
      if (v > 10) return 60;
      if (v > 5) return 40;
      if (v > 0) return 20;
      return 0;
    },
    comment: (v) => {
      if (v == null) return "Directional Movement Index (DMI) data is not available.";
if (v > 30) return "The market trend is very clear. A strong directional move has formed.";
if (v > 20) return "Directional strength is gradually increasing. You may consider this in your investment decisions.";
if (v > 10) return "The directional movement is still weak. It's better to keep watching.";
if (v > 5) return "No clear signal at the moment. Observing is recommended.";
return "No noticeable trend is currently forming.";

    }
  }
];

// === 2. 데이터 로딩 ===
function showAlert(message) {
  const alertBox = document.getElementById('alert-box');
  alertBox.innerText = message;
  alertBox.style.display = 'block';
}

function hideAlert() {
  const alertBox = document.getElementById('alert-box');
  alertBox.style.display = 'none';
}


async function fetchData(ticker) {
  hideAlert();

  const url = `https://financialmodelingprep.com/api/v3/historical-price-full/${ticker}?apikey=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  // FMP API 호출 오류 확인 (예: data.historical이 없거나 빈 배열)
  if (!data.historical || data.historical.length === 0) {
    showAlert("❌ Failed to load data.");
throw new Error("Failed to load data.");

  }

  // 날짜순 오름차순 정렬 (기본 내림차순이라면)
  const rows = data.historical.slice().sort((a,b) => new Date(a.date) - new Date(b.date));

  return {
    closes: rows.map(r => parseFloat(r.close)),
    highs: rows.map(r => parseFloat(r.high)),
    lows: rows.map(r => parseFloat(r.low)),
    volumes: rows.map(r => parseFloat(r.volume))
  };
}




// === 3. 지표 계산 ===
function sma(values, period) {
  if (values.length < period) return null;
  let sum = 0;
  for (let i = values.length - period; i < values.length; i++) sum += values[i];
  return sum / period;
}

function ema(values, period) {
  if (values.length < period) return null;
  const k = 2 / (period + 1);
  let emaPrev = sma(values.slice(0, period), period);
  let emaArr = [emaPrev];
  for (let i = period; i < values.length; i++) {
    emaPrev = values[i] * k + emaPrev * (1 - k);
    emaArr.push(emaPrev);
  }
  return emaArr.at(-1);
}

function rsi(values, period = 14) {
  if (values.length < period + 1) return null;
  let gain = 0, loss = 0;
  for (let i = values.length - period; i < values.length; i++) {
    const diff = values[i] - values[i - 1];
    if (diff > 0) gain += diff;
    else loss -= diff;
  }
  if (gain + loss === 0) return 50;
  const rs = gain / loss || 0.00001;
  return 100 - (100 / (1 + rs));
}

function macd(values, fast=12, slow=26, signal=9) {
  if (values.length < slow + signal) return null;
  const emaFastArr = [];
  let emaFast = sma(values.slice(0, fast), fast);
  emaFastArr[fast-1] = emaFast;
  for (let i = fast; i < values.length; i++) {
    emaFast = values[i] * (2/(fast+1)) + emaFast * (1-2/(fast+1));
    emaFastArr.push(emaFast);
  }
  const emaSlowArr = [];
  let emaSlow = sma(values.slice(0, slow), slow);
  emaSlowArr[slow-1] = emaSlow;
  for (let i = slow; i < values.length; i++) {
    emaSlow = values[i] * (2/(slow+1)) + emaSlow * (1-2/(slow+1));
    emaSlowArr.push(emaSlow);
  }
  const macdLine = [];
  for (let i = 0; i < emaSlowArr.length; i++) {
    const idx = i + (slow - fast);
    macdLine.push(emaFastArr[idx] - emaSlowArr[i]);
  }
  let signalLine = sma(macdLine.slice(macdLine.length-signal), signal);
  return macdLine.at(-1) - signalLine;
}

function ppo(values, fast=12, slow=26, signal=9) {
  if (values.length < slow + signal) return null;
  const emaFast = ema(values, fast);
  const emaSlow = ema(values, slow);
  if (!emaSlow || emaSlow === 0) return null;
  return ((emaFast - emaSlow) / emaSlow) * 100;
}

function bollingerBands(values, period=20, stdDev=2) {
  if (values.length < period) return { mid: null, upper: null, lower: null };
  const arr = values.slice(-period);
  const mean = arr.reduce((a,b)=>a+b,0)/period;
  const variance = arr.reduce((a,b)=>a+Math.pow(b-mean,2),0)/period;
  const stdev = Math.sqrt(variance);
  return {
    mid: mean,
    upper: mean + stdev*stdDev,
    lower: mean - stdev*stdDev
  };
}

function obv(closes, volumes) {
  let obv = 0;
  for (let i = 1; i < closes.length; i++) {
    if (closes[i] > closes[i-1]) obv += volumes[i];
    else if (closes[i] < closes[i-1]) obv -= volumes[i];
  }
  return obv;
}

function mfi(highs, lows, closes, volumes, period=14) {
  if (closes.length < period+1) return null;
  let posMF = 0, negMF = 0;
  for (let i = closes.length-period; i < closes.length; i++) {
    const tp = (highs[i] + lows[i] + closes[i]) / 3;
    const prevTp = (highs[i-1] + lows[i-1] + closes[i-1]) / 3;
    const rawMF = tp * volumes[i];
    if (tp > prevTp) posMF += rawMF;
    else if (tp < prevTp) negMF += rawMF;
  }
  if (negMF === 0) return 100;
  const mfRatio = posMF / negMF;
  return 100 - (100 / (1 + mfRatio));
}

function cci(highs, lows, closes, period=20) {
  if (closes.length < period) return null;
  const arr = [];
  for (let i = closes.length - period; i < closes.length; i++) {
    arr.push((highs[i] + lows[i] + closes[i]) / 3);
  }
  const tp = arr[arr.length - 1];
  const smaTp = arr.reduce((a,b)=>a+b,0)/period;
  const meanDev = arr.reduce((a,b)=>a+Math.abs(b-smaTp),0)/period;
  return (tp - smaTp) / (0.015 * meanDev);
}

function roc(values, period=12) {
  if (values.length < period+1) return null;
  const prev = values[values.length - period - 1];
  if (prev === 0) return null;
  return ((values[values.length-1] - prev) / prev) * 100;
}

function atr(highs, lows, closes, period=14) {
  if (closes.length < period+1) return null;
  const trs = [];
  for (let i = closes.length-period; i < closes.length; i++) {
    trs.push(Math.max(
      highs[i]-lows[i],
      Math.abs(highs[i]-closes[i-1]),
      Math.abs(lows[i]-closes[i-1])
    ));
  }
  return trs.reduce((a,b)=>a+b,0)/period;
}

function vwap(closes, volumes) {
  let cumulativePV = 0, cumulativeV = 0;
  for (let i = 0; i < closes.length; i++) {
    cumulativePV += closes[i] * volumes[i];
    cumulativeV += volumes[i];
  }
  return cumulativeV ? cumulativePV / cumulativeV : null;
}

function stochastic(highs, lows, closes, period=14, signalPeriod=3) {
  if (closes.length < period) return { k: null, d: null };
  const sliceHighs = highs.slice(-period);
  const sliceLows = lows.slice(-period);
  const highestHigh = Math.max(...sliceHighs);
  const lowestLow = Math.min(...sliceLows);
  const close = closes.at(-1);
  const k = ((close - lowestLow) / (highestHigh - lowestLow)) * 100;
  // D는 최근 signalPeriod일간의 K 평균
  // (실전에서는 K값 히스토리 관리, 여기선 단순화)
  return { k, d: k };
}

// === Ichimoku, ADX, DMI는 대충 구조만 보존해둠 ===
// (간이판, 실제 투자 분석엔 더 정교한 공식 필요)
function ichimoku(highs, lows) {
  if (highs.length < 52) return null;
  const conv = (Math.max(...highs.slice(-9)) + Math.min(...lows.slice(-9))) / 2;
  const base = (Math.max(...highs.slice(-26)) + Math.min(...lows.slice(-26))) / 2;
  return { conversion: conv, base: base };
}

function adx(highs, lows, closes, period=14) {
  // 여기선 간단화 (실제 계산은 훨씬 복잡)
  if (highs.length < period+1) return null;
  let sum = 0;
  for (let i = closes.length-period; i < closes.length; i++) {
    sum += Math.abs(highs[i] - lows[i]);
  }
  return sum / period;
}

// DMI: ADX 대용 (실전은 더 정교)
function dmi(highs, lows, closes, period=14) {
  return adx(highs, lows, closes, period); // 임시 동치
}

// === 실제 calcIndicators(data) ===

function calcIndicators(data) {
  return {
    MA5: sma(data.closes, 5),
    MA10: sma(data.closes, 10),
    MA20: sma(data.closes, 20),
    MA60: sma(data.closes, 60),
    MA120: sma(data.closes, 120),
    MA200: sma(data.closes, 200),
    RSI2: rsi(data.closes, 2),
    RSI14: rsi(data.closes, 14),
    MACD: macd(data.closes),
    PPO: ppo(data.closes),
    Bollinger: bollingerBands(data.closes),
    OBV: obv(data.closes, data.volumes),
    MFI: mfi(data.highs, data.lows, data.closes, data.volumes),
    CCI: cci(data.highs, data.lows, data.closes),
    ADX: adx(data.highs, data.lows, data.closes),
    DMI: dmi(data.highs, data.lows, data.closes),
    ROC: roc(data.closes),
    Ichimoku: ichimoku(data.highs, data.lows),
    StochasticFast: stochastic(data.highs, data.lows, data.closes, 14, 3).k,
    StochasticSlow: stochastic(data.highs, data.lows, data.closes, 14, 3).d,
    ATR: atr(data.highs, data.lows, data.closes),
    VWAP: vwap(data.closes, data.volumes)
  };
}


// === 4. 전략별 점수/코멘트/지표코멘트 분석 ===
function getStrategyComment(strategy, score, lackList) {
  let lackMsg = "";
if (lackList.length)
  lackMsg = `<br><b style="color:#b52d2d">※ Indicators excluded due to insufficient data: ${lackList.join(", ")}</b>`;

let desc = "";
if (score >= 90) {
  desc = `In the ${strategy} strategy, nearly all signals indicate a very strong upward trend. Buying pressure is clear, and investor sentiment is highly positive. There appears to be significant potential for further gains, and it may be time for a prompt decision. However, keep in mind that rapid rises can be followed by corrections, so risk management is essential. Careful investing is recommended.`;
} else if (score >= 76) {
  desc = `In the ${strategy} strategy, many strong bullish signals have been detected. The market sentiment is positive, and investors are actively participating. The uptrend is likely to continue, but some volatility should be expected. Consider a cautious approach such as averaging in or reviewing momentum-based entries.`;
} else if (score >= 61) {
  desc = `In the ${strategy} strategy, several favorable signals are emerging. Investor interest is increasing and the overall tone is positive. However, it's important to prepare for volatility or unexpected events. A cautious entry is recommended over aggressive buying.`;
} else if (score >= 41) {
  desc = `In the ${strategy} strategy, mixed signals of both uptrend and downtrend are observed. Due to uncertainty, a conservative approach is advisable. Consider waiting for a clearer trend or entering in small portions. Risk management is essential.`;
} else if (score >= 21) {
  desc = `In the ${strategy} strategy, bearish signals are more prominent. Selling pressure is stronger than buying pressure, and there is a risk of further decline. Standing by might be more advantageous for now. A defensive strategy is needed to prepare for possible additional downside.`;
} else {
  desc = `In the ${strategy} strategy, very negative signals are consistently appearing. A strong downtrend is in progress, and entering now may lead to significant losses. It is best to stay highly conservative until signs of a rebound become clear. Pay extra attention to risk management due to high uncertainty.`;
}

if (desc.split('.').length < 5)
  desc += " Careful investing is advised, and please check the overall market conditions. If there are indicators with insufficient data, consider that in your interpretation.";

return desc + lackMsg;

}

function analyzeStrategy(strategy, indicatorDefs, indicators, closes) {
  // 안전하게 strategy 키를 매핑하는 함수
  function mapStrategyKey(key) {
    const map = {
      "short-term": "단기",
      "short term": "단기",
      "shortterm": "단기",
      "swing": "스윙",
      "long-term": "장기",
      "long term": "장기",
      "longterm": "장기"
    };
    if (!key) return "";
    const normalizedKey = key.toLowerCase().trim();
    return map[normalizedKey] || key;
  }

  const mappedStrategy = mapStrategyKey(strategy);
  const keys = STRATEGY[mappedStrategy] || [];

  console.log({
    strategy,
    mappedStrategy,
    keys,
    keysLength: keys.length
  });

  let total = 0, cnt = 0, lackList = [];
  let detailHtml = "";

  for (const key of keys) {
    const def = indicatorDefs.find(d => d.key === key);
    let v = indicators[key];
    let score = 0, lack = false;
    if(key === "Bollinger") {
      if (!v || v.mid==null || v.upper==null || v.lower==null) lack = true;
      else score = def.score(closes.at(-1), v.upper, v.lower);
    }
    else if(key === "Ichimoku") {
      if (!v) lack = true;
      else score = def.score(v, closes.at(-1));
    }
    else {
      if (v==null) lack = true;
      else if (key.startsWith("MA") || key==="VWAP") score = def.score(v, closes.at(-1));
      else score = def.score(v);
    }
    if(lack) lackList.push(def.name);
    else { total += score; cnt++; }
    detailHtml += `<li><b>${def.name}</b>: ${lack ? "Insufficient data / excluded from scoring" : def.comment(v, closes.at(-1))}</li>`;
  }
  let finalScore = cnt > 0 ? Math.round(total/cnt) : 0;
  return {
    score: finalScore,
    comment: getStrategyComment(strategy, finalScore, lackList),
    detailHtml
  };
}


// --- 도넛 차트 그리기 ---
let scoreGauges = {};
function drawDonut(id, score, color) {
  const ctx = document.getElementById(id).getContext('2d');
  if (scoreGauges[id]) scoreGauges[id].destroy();
  scoreGauges[id] = new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [score, 100 - score],
        backgroundColor: [color, "#e7e7e7"],
        borderWidth: 0,
        cutout: "70%"
      }]
    },
    options: {
      cutout: '70%',
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  });
  document.getElementById(id + '-label').innerText = score;
}

// --- 메인 분석 함수 ---
function analyze() {
  const ticker = document.getElementById('ticker').value.trim().toUpperCase();
  if (!ticker) {
    alert("Enter a stock ticker!");
    return;
  }

  const welcome = document.getElementById('welcome-visual');
  const loadingSpinner = document.getElementById('loading-spinner');
  const cardSection = document.querySelector('.card-section');
  const detailsSection = document.querySelector('.details-section');

  if (welcome) welcome.style.display = "none";
  if (cardSection) cardSection.style.display = "none";
  if (detailsSection) detailsSection.style.display = "none";

  if (loadingSpinner) loadingSpinner.style.display = "flex";

  document.getElementById('summary-comment').innerHTML = "";
  document.getElementById('score-label').innerText = ``;
  document.getElementById('score-meta').innerHTML = "";
  document.getElementById('score-recommend').innerHTML = "";

  fetchData(ticker).then(data => {
    if (loadingSpinner) loadingSpinner.style.display = "none";
    if (cardSection) cardSection.style.display = "flex";
    if (detailsSection) detailsSection.style.display = "block";

    const indicators = calcIndicators(data);

    const strategyNames = ["Short-term", "Swing", "Long-term"];
    let chartColors = ["#49b6ed", "#44ca6b", "#fc9f54"];
    let html = "";

    let donutHtml = '<div style="display:flex;gap:2.5rem;justify-content:center;margin-bottom:1.2rem">';
    for(let i=0;i<3;i++) {
      donutHtml += `
      <div style="text-align:center;">
        <canvas id="donut${i}" width="110" height="110"></canvas>
        <div id="donut${i}-label" style="font-size:1.7em;margin-top:-60%;font-weight:bold;position:relative;color:#222;"></div>
        <div style="font-size:1.05em;font-weight:bold;margin-top:65px;">${strategyNames[i]} Strategy</div>
      </div>`;
    }
    donutHtml += "</div>";
    html += donutHtml;

    let scoreArr = [];
    for(let i=0;i<3;i++) {
      const strategy = strategyNames[i];
      const res = analyzeStrategy(strategy, INDICATOR_FULL_SET, indicators, data.closes);
      scoreArr.push(res.score);
      html += `
        <div class="item-comment">
          <div>${strategy}Total Strategy Score: <span style="color:#266bd8">${res.score} pts</span></div>
          <div>${res.comment}</div>
          <ul>${res.detailHtml}</ul>
        </div>
      `;
    }
    document.getElementById("summary-comment").innerHTML = html;
    for(let i=0;i<3;i++) {
      drawDonut(`donut${i}`, scoreArr[i], chartColors[i]);
    }
    document.getElementById("score-label").innerText = `Total Strategy Score`;
    document.getElementById("score-meta").innerHTML = `<span style="color:#1c3765;">${ticker} Analysis<br>Date & Time of Inquiry: ${(new Date()).toLocaleString()}</span>`;
    document.getElementById("score-recommend").innerHTML = "";

  }).catch(e => {
    if (loadingSpinner) loadingSpinner.style.display = "none";
    document.getElementById("summary-comment").innerHTML = `<span style="color:red;">${e.message}</span>`;
    document.getElementById("score-label").innerText = "";
    document.getElementById("score-meta").innerHTML = "";
    document.getElementById("score-recommend").innerHTML = "";
  });
}

window.onload = () => {
  if(document.getElementById('welcome-visual')) document.getElementById('welcome-visual').style.display = "flex";
  if(document.querySelector('.card-section')) document.querySelector('.card-section').style.display = "none";
  if(document.querySelector('.details-section')) document.querySelector('.details-section').style.display = "none";
};

// // 1. 화면 블러 처리 함수
// function blockPage() {
//   // 1) 내용 흐리게(blur) 처리
//   document.body.style.filter = "blur(7px)";
//   // 2) 블록 오버레이 표시
//   document.getElementById('block-overlay').style.display = "block";
//   // 4) 강제 리다이렉트 (원한다면 주석 해제)
//   location.href = "https://google.com"; // 또는 다른 사이트로 강제 이동
// }

// // 2. 우클릭/F12/소스보기 단축키 등 방지
// document.addEventListener('contextmenu', function(e) { e.preventDefault(); });
// document.addEventListener('keydown', function(e) {
//   if (e.key === "F12") e.preventDefault();
//   if (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "i")) e.preventDefault();
//   if (e.ctrlKey && (e.key === "U" || e.key === "u")) e.preventDefault();
// });

// // 3. 개발자도구 열림 감지 후 바로 차단
// (function() {
//   let blocked = false;
//   const threshold = 160;
//   setInterval(function() {
//     if (
//       window.outerWidth - window.innerWidth > threshold ||
//       window.outerHeight - window.innerHeight > threshold
//     ) {
//       if (!blocked) {
//         location.href = "https://google.com"; // 또는 다른 사이트로 강제 이동
        
//         blockPage();
//         blocked = true;
//       }
//     } else {
//       blocked = false;
//     }
//   }, 800);
// })();