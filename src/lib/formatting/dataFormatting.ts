import { BankDataType } from "../bank-data";

// Bank: Eidsberg Sparebank
// Account name: Fastrentekonto 36 mnd
// intrest : [
// {
// from : 0,
// to : 100000,
// interest : 0.5

// }
// ]
// ageGroup {
// from : 0,
// to : 100,
// }
// monthySaving {
// from : 0,
// to : 100000,
// }
// description : " "SpareBank 1 Nordmøre ønsker å være der for deg som kunde i ulike livssituasjoner og kan tilby ulike økonomiske løsninger.","
// membership: ["LOfavør Ung", "LOfavør"]

const getBankName = (data: BankDataType[number]) => {
  return data.leverandor_tekst;
};

const getAccountName = (data: BankDataType[number]) => {
  return data.navn;
};

type IntrestRateKeys =
  | "rentesats1"
  | "rentesats2"
  | "rentesats3"
  | "rentesats4"
  | "rentesats5"
  | "rentesats6";

type InterestAmountLimitKeys =
  | "grensebelop1"
  | "grensebelop2"
  | "grensebelop3"
  | "grensebelop4"
  | "grensebelop5"
  | "grensebelop6";

const getInterest = (data: BankDataType[number], key: IntrestRateKeys) => {
  return data[key];
};

const getInterestAmountLimit = (
  data: BankDataType[number],
  key: InterestAmountLimitKeys
) => {
  return data[key];
};

const connectInterestAndInterestAmountLimit = (
  data: BankDataType[number],
  rateKey: IntrestRateKeys,
  amountKey: InterestAmountLimitKeys
) => {
  const interest = getInterest(data, rateKey);
  const interestAmountLimit = getInterestAmountLimit(data, amountKey);

  return {
    interest,
    interestAmountLimit,
  };
};

const getInterestRate = (data: BankDataType[number]) => {
  const interestRate = [
    connectInterestAndInterestAmountLimit(data, "rentesats1", "grensebelop1"),
    connectInterestAndInterestAmountLimit(data, "rentesats2", "grensebelop2"),
    connectInterestAndInterestAmountLimit(data, "rentesats3", "grensebelop3"),
    connectInterestAndInterestAmountLimit(data, "rentesats4", "grensebelop4"),
    connectInterestAndInterestAmountLimit(data, "rentesats5", "grensebelop5"),
    connectInterestAndInterestAmountLimit(data, "rentesats6", "grensebelop6"),
  ];

  const filteredInterestRate = interestRate.filter(
    (interest) => interest.interest !== ""
  );

  return filteredInterestRate;
};

const getAgeGroup = (data: BankDataType[number]) => {
  const minAge = data.min_alder;
  const maxAge = data.maks_alder;
  return {
    minAge,
    maxAge,
  };
};

const getMonthlySaving = (data: BankDataType[number]) => {
  const minMonthlySaving = data.manedlig_sparing_min_belop;
  const maxMonthlySaving = data.manedlig_sparing_maks_belop;
  const isMonthlySaving = data.manedlig_sparing;
  return {
    minMonthlySaving,
    maxMonthlySaving,
    isMonthlySaving,
  };
};

const getMembership = (data: BankDataType[number]) => {
  const membership = data.medlemskap_tekst;
  const membershipArray = membership
    .split(",")
    .filter((item) => item !== "")
    .map((item) => item.trim());
  return membershipArray;
};

const getTerms = (data: BankDataType[number]) => {
  return data.spesielle_betingelser;
};

const sortByInterestRate = (
  a: BankDataType[number],
  b: BankDataType[number]
) => {
  const aInterest = a.rentesats1;
  const bInterest = b.rentesats1;

  if (aInterest < bInterest) {
    return 1;
  }
  if (aInterest > bInterest) {
    return -1;
  }
  return 0;
};

const formatData = (data: BankDataType) => {
  return data.sort(sortByInterestRate).map((bank) => {
    return {
      bankName: getBankName(bank),
      accountName: getAccountName(bank),
      interestRate: getInterestRate(bank),
      ageGroup: getAgeGroup(bank),
      monthlySaving: getMonthlySaving(bank),
      membership: getMembership(bank),
      terms: getTerms(bank),
    };
  });
};

export default formatData;

export type FormattedBankData = ReturnType<typeof formatData>;
