import { getTheme } from '@/constants/Themes';
import { useThemeMode } from '@/context/ThemeContext';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import GradientDivider from '../GradientLine';
import SectionWrapper from '../SectionWrapper';
import ForecastCard from './ForecastCard';

// Expects an array of forecast data and a temperature unit
interface ForecastProps {
  data: {
    dt_txt: string;
    main: { temp: number };
    weather: { main: string; description: string; icon: string }[];
  }[];
  unit: 'metric' | 'imperial';
}

export default function Forecast({ data, unit }: ForecastProps) {
  // Filter for daily forecasts at noon (12:00:00)
  const daily = data.filter((d) => d.dt_txt.includes('12:00:00'));
  // Use theme from context, fallback to system if set
  const { mode } = useThemeMode();
  const system = useColorScheme() ?? 'light';
  const effective = mode === 'system' ? system : mode;
  const theme = getTheme(effective);

  return (
    <SectionWrapper>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        5 Day Forecast
      </Text>
      <GradientDivider />
      <View style={styles.row}>
        {/* Show up to 5 daily forecast cards */}
        {daily.slice(0, 5).map((item, idx) => (
          <ForecastCard
            key={idx}
            forecast={item}
            unit={unit}
            variant="daily"
          />
        ))}
      </View>
    </SectionWrapper>
  );
}

// Styles for section and row layout
const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
    textAlign: 'left',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
});
