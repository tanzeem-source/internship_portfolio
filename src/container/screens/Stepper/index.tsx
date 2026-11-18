import React, { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import BackIcon from '../../../assets/Svg/back.svg';
import { fontScale } from '../../utilities/Utils';
import ScreenWrapper from '../../components/ScreenWrapper';
import AppButton from '../../components/AppButton';
import AppText from '../../components/AppText';
import ArrowRight from '../../../assets/svgComp/ArrowRight';

const steps = [
  {
    title: 'Store Information',
    subtitle: 'Location, Owner details, Open & Close hrs.',
    screen: 'StoreInformation',
  },
  {
    title: 'Store Documents',
    subtitle: 'PAN & GSTIN, Bank Details, FSSAI Certificate.',
    screen: 'StoreDocuments',
  },
  {
    title: 'Partner Contract',
    subtitle: 'Commission, Onboarding fee, Contract.',
    screen: 'PartnerContract',
  },
];

const StepperScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (route.params?.completedStep !== undefined) {
      setActiveStep(route.params.completedStep + 1);
    }
  }, [route.params?.completedStep]);

  return (
    <ScreenWrapper>
      <LinearGradient colors={['#E0EDFC', '#FFFFFF']} style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <BackIcon width={20} height={20} />
        </Pressable>

        <View style={styles.headerTextContainer}>
          <AppText style={styles.headerTitle}>
            Let’s finish{'\n'}onboarding you!
          </AppText>

          <AppText style={styles.headerSubtitle}>
            In less than 10 minutes
          </AppText>
        </View>
      </LinearGradient>
      <View style={styles.container}>
        {steps.map((step, index) => {
          const isActive = index === activeStep;
          const isCompleted = index < activeStep;

          return (
            <View key={step.title} style={styles.row}>
              <View style={styles.timeline}>
                <View
                  style={[
                    styles.circleOuter,
                    (isActive || isCompleted) && styles.circleOuterActive,
                    !isActive && !isCompleted && styles.circleOuterInactive,
                  ]}
                >
                  <View
                    style={[
                      styles.circleInner,
                      (isActive || isCompleted) && styles.circleInnerActive,
                      !isActive && !isCompleted && styles.circleInnerInactive,
                    ]}
                  />
                </View>
                {index !== steps.length - 1 && (
                  <View
                    style={[
                      styles.line,
                      isCompleted ? styles.activeLine : styles.inactiveLine,
                    ]}
                  />
                )}
              </View>

              <View style={styles.content}>
                <AppText style={styles.stepLabel}>{`Step ${
                  index + 1
                }`}</AppText>
                <AppText style={styles.title}>{step.title}</AppText>
                <AppText style={styles.subtitle}>{step.subtitle}</AppText>

                {isCompleted && (
                  <AppButton
                    title="Edit details"
                    style={styles.edit}
                    onPress={() =>
                      navigation.navigate(
                        step.screen as any,
                        {
                          stepIndex: index,
                        } as never,
                      )
                    }
                  />
                )}

                {isActive && (
                  <AppButton
                    text={index === steps.length - 1 ? 'Finish' : 'Proceed'}
                    btnStyle={styles.button}
                    onPress={() =>
                      navigation.navigate(
                        step.screen as never,
                        {
                          stepIndex: index,
                        } as never,
                      )
                    }
                  />
                )}

                {index !== steps.length - 1 && (
                  <View style={styles.separator} />
                )}
              </View>
            </View>
          );
        })}
      </View>
    </ScreenWrapper>
  );
};

export default StepperScreen;

const styles = StyleSheet.create(theme => ({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backBtn: {
    backgroundColor: '#FCFCFC',
    borderRadius: 12,
    alignSelf: 'flex-start',
    left: 18,
    top: 12,
    padding: 14,
  },

  headerTextContainer: {
    marginTop: 40,
    alignSelf: 'flex-start',
    marginLeft: 22,
  },

  headerTitle: {
    fontSize: 20 / fontScale,
    color: theme.colors.text_primary,
    fontWeight: '600',
  },

  headerSubtitle: {
    fontSize: 12 / fontScale,
    color: theme.colors.grey,
    marginTop: 4,
  },
  container: {
    flex: 1,
    padding: 24,
    marginTop: 0,
  },

  row: {
    flexDirection: 'row',
  },

  timeline: {
    width: 30,
    alignItems: 'center',
  },
  circleOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 3,
    marginRight: 16,
    backgroundColor: '#FFFFFF',
  },

  circleOuterActive: {
    borderWidth: 12,
    borderColor: '#DCEAFE',
  },
  circleOuterInactive: {
    borderWidth: 0,
  },
  circleInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  circleInnerActive: {
    backgroundColor: theme.colors.primary,
  },
  circleInnerInactive: {
    backgroundColor: '#D6D6D6',
  },
  line: {
    width: 1,
    flex: 1,
    marginTop: 4,
    borderLeftWidth: 1,
    borderStyle: 'dashed',
    marginRight: 16,
  },
  activeLine: {
    borderColor: theme.colors.primary,
    opacity: 0.6,
  },
  inactiveLine: {
    borderColor: '#C2C7CC',
    opacity: 0.7,
  },
  content: {
    flex: 1,
    paddingBottom: 20,
    gap: 2,
  },
  stepLabel: {
    fontSize: 12 / fontScale,
    color: theme.colors.grey,
    fontWeight: '500',
  },
  title: {
    fontSize: 16 / fontScale,
    marginBottom: 0,
    color: theme.colors.text_primary,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 13 / fontScale,
    color: theme.colors.grey,
    marginTop: 0,
    fontWeight: '400',
  },
  edit: {
    color: theme.colors.primary,
    marginVertical: 2,
  },
  button: {
    width: 212,
    height: 51,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#E7E7E7',
    width: 337.01,
    left: 0,
    marginTop: 15,
    marginBottom: 0,
  },
}));
