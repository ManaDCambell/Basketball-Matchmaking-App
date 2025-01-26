import { StyleSheet, Image, Platform } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';

import SwitchSelector from 'react-native-switch-selector';

const options = [
  { label: 'Casual Play', value: '1' },
  { label: 'Competitive', value: '2' }
];

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">User Profile</ThemedText>
      </ThemedView>
      <ThemedText>Tap each of the dropdowns to get started.</ThemedText>

      <Collapsible title="User">
        <ThemedText>
          Name:
        </ThemedText>
        <ThemedText>
          Photo:
        </ThemedText>
        <ThemedText>
          Age:
        </ThemedText>
        <ThemedText>
          Location:
        </ThemedText>
        <ThemedText>
          Experience:
        </ThemedText>
      </Collapsible>


      <Collapsible title="Contact">
        <ThemedText>
          Phone Number:
        </ThemedText>
        <ThemedText>
          Email:
        </ThemedText>
      </Collapsible>
      

      <Collapsible title="Skill Prefrence">
        <SwitchSelector options={options} initial={1} onPress={value => console.log(`Call onPress with value: ${value}`)} />
      </Collapsible>


      <Collapsible title="Availability">
        <ThemedText>
          Calendar View?
        </ThemedText>
      </Collapsible>


      <Collapsible title="Stats">
      <ThemedText>
          Link to stat page
        </ThemedText>
      </Collapsible>


      <Collapsible title="Yelp Review">
      <ThemedText>
          Yelp reviews with time, data, and user who wrote the review
        </ThemedText>
      </Collapsible>


    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
