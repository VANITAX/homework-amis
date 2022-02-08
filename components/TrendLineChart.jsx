import { useCallback, useMemo } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, View, StyleSheet } from 'react-native';
import FormatNumberText from '../components/FormatNumberText';
import font from '../constants/styleFonts';

const CHART_LINE_COLOR = '#6EF183';
const INTERVAL = 5;
const chartWidth = Dimensions.get('window').width + 70;

const getDataHL = (data) => {
  const result = { high: null, low: null };
  if(!data?.length) return result;
  data.forEach((value, i)=>{
    if(i === 0){
      result.high = value;
      result.low = value;
    }
    if(value > result.high) result.high = value;
    if(value < result.low) result.low = value;
  });
  return result;
}

export default function TrendLineChart({ data, style }) {
  const color = useCallback(() => CHART_LINE_COLOR, []);
  const { high, low } = useMemo(()=> getDataHL(data),[data]);
  return (
    <View style={styles.container}>
      <FormatNumberText
        style={[styles.priceLabel, styles.highPrice]}
        prefix="$" 
        fixed={2}
        format="commas" 
        value={high}
      />
      <LineChart
        data={{
          datasets: [{ data }],
        }}
        width={chartWidth}
        height={180}
        withDots={false}
        withVerticalLabels={false}
        withHorizontalLabels={false}
        withHorizontalLines={false}
        withVerticalLines={false}
        withOuterLines={false}
        withShadow={false}
        chartConfig={{color}}
        style={styles.chart}
        bezier
      />
      <FormatNumberText
        style={[styles.priceLabel, styles.lowPrice]}
        prefix="$" 
        fixed={2}
        format="commas" 
        value={low}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  priceLabel: {
    fontSize: 12,
    color: '#fff',
    ...font.roboto.bold
  },
  highPrice: {
    alignSelf: 'flex-end',
  },
  lowPrice: {
    alignSelf: 'flex-start',
  },
  chart: {
    transform: ([
      { translateX: -65 }
    ])
  }
})