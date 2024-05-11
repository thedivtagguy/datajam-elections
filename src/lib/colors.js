import { lab } from 'd3-color';

export function contrastingColor(color) {
	const colorLab = lab(color);

	const MIN_DIFF = 50;
	const MAX_DIFF = 90;

	let l = colorLab.l;
	let output = 100 - l;
	let contrast = Math.abs(l - output);
	let textColor;
	let hoverBgColor;
	let textOutlineColor;

	if (l < output) {
		if (contrast < MIN_DIFF) {
			output = l + MIN_DIFF;
		} else if (contrast > MAX_DIFF) {
			output = l + MAX_DIFF;
		}

		textColor = lab(output, colorLab.a, colorLab.b);
		textOutlineColor = 'rgba(0, 0, 0, 0.5)';
		hoverBgColor = colorLab.brighter();
	} else {
		if (contrast < MIN_DIFF) {
			output = l - MIN_DIFF;
		} else if (contrast > MAX_DIFF) {
			output = l - MAX_DIFF;
		}

		textColor = lab(output, colorLab.a, colorLab.b);
		textOutlineColor = 'rgba(255, 255, 255, 0.5)';
		hoverBgColor = colorLab.darker();
	}

	return {
		textColor: textColor.formatRgb(),
		textOutlineColor,
		hoverBgColor: hoverBgColor.formatRgb()
	};
}

export const partyColors = {
	AAP: {
		fullName: 'Aam Aadmi Party',
		backgroundColor: '#0072b0',
		textColor: '#FFFFFF'
	},
	AIADMK: {
		fullName: 'All India Anna Dravida Munnetra Kazhagam',
		backgroundColor: '#009546',
		textColor: '#FFFFFF'
	},
	AIMIM: {
		fullName: 'All India Majlis-E-Ittehadul Muslimeen',
		backgroundColor: '#0c6b4b',
		textColor: '#FFFFFF'
	},
	AINRC: {
		fullName: 'All India N.R. Congress',
		backgroundColor: '#fda209',
		textColor: '#FFFFFF'
	},
	AIUDF: {
		fullName: 'All India United Democratic Front',
		backgroundColor: '#348017',
		textColor: '#000000'
	},
	AJSU: {
		fullName: 'All Jharkhand Students Union',
		backgroundColor: '#6827b5',
		textColor: '#FFFFFF'
	},
	AIFB: {
		fullName: 'All India Forward Bloc',
		backgroundColor: '#ac1313',
		textColor: '#FFFFFF'
	},
	BJD: {
		fullName: 'Biju Janata Dal',
		backgroundColor: '#70a548',
		textColor: '#000000'
	},
	BJP: {
		fullName: 'Bharatiya Janata Party',
		backgroundColor: '#ff9933',
		textColor: '#FFFFFF'
	},
	BSP: {
		fullName: 'Bahujan Samaj Party',
		backgroundColor: '#22409a',
		textColor: '#FFFFFF'
	},
	CPIML: {
		fullName: 'Communist Party of India (Marxist-Leninist)',
		backgroundColor: '#cc0d0d',
		textColor: '#FFFFFF'
	},
	BPF: {
		fullName: "Bodoland People's Front",
		backgroundColor: '#ff6600',
		textColor: '#FFFFFF'
	},
	CPIM: {
		fullName: 'Communist Party of India (Marxist)',
		backgroundColor: '#c41301',
		textColor: '#000000'
	},
	DMDK: {
		fullName: 'Desiya Murpokku Dravida Kazhagam',
		backgroundColor: '#ffea19',
		textColor: '#000000'
	},
	DMK: {
		fullName: 'Dravida Munnetra Kazhagam',
		backgroundColor: '#ff0d0d',
		textColor: '#ffffff'
	},
	GFP: {
		fullName: 'Goa Forward Party',
		backgroundColor: '#353982',
		textColor: '#000000'
	},
	INC: {
		fullName: 'Indian National Congress',
		backgroundColor: '#19aaed',
		textColor: '#FFFFFF'
	},
	INLD: {
		fullName: 'Indian National Lok Dal',
		backgroundColor: '#336600',
		textColor: '#FFFFFF'
	},
	IUML: {
		fullName: 'Indian Union Muslim League',
		backgroundColor: '#336600',
		textColor: '#FFFFFF'
	},
	JCC: {
		fullName: 'Janta Congress Chhattisgarh',
		backgroundColor: '#ffc0db',
		textColor: '#000000'
	},
	JD: {
		fullName: 'Janata Dal',
		backgroundColor: '#FFD700',
		textColor: '#000000'
	},
	JDU: {
		fullName: 'Janata Dal (United)',
		backgroundColor: '#003366',
		textColor: '#000000'
	},
	JKNC: {
		fullName: 'Jammu & Kashmir National Conference',
		backgroundColor: '#fe0000',
		textColor: '#FFFFFF'
	},
	JJP: {
		fullName: 'Jannayak Janata Party',
		backgroundColor: '#026d37',
		textColor: '#FFFFFF'
	},
	MNF: {
		fullName: 'Mizo National Front',
		backgroundColor: '#2e5694',
		textColor: '#FFFFFF'
	},
	MNS: {
		fullName: 'Maharashtra Navnirman Sena',
		backgroundColor: '#5f2301',
		textColor: '#FFFFFF'
	},
	NCP: {
		fullName: 'Nationalist Congress Party',
		backgroundColor: '#008000',
		textColor: '#FFFFFF'
	},
	NPF: {
		fullName: "Naga People's Front",
		backgroundColor: '#1717cc',
		textColor: '#FFFFFF'
	},
	PDP: {
		fullName: 'Peoples Democratic Party',
		backgroundColor: '#058532',
		textColor: '#FFFFFF'
	},
	MPC: {
		fullName: "Mizoram People's Conference",
		backgroundColor: '#6A5ACD',
		textColor: '#FFFFFF'
	},
	PDF: {
		fullName: "People's Democratic Front",
		backgroundColor: '#FF4500',
		textColor: '#FFFFFF'
	},
	PPA: {
		fullName: "People's Party of Arunachal",
		backgroundColor: '#008000',
		textColor: '#FFFFFF'
	},
	PMK: {
		fullName: 'Pattali Makkal Katchi',
		backgroundColor: '#FF4500',
		textColor: '#FFFFFF'
	},
	RLD: {
		fullName: 'Rashtriya Lok Dal',
		backgroundColor: '#FFA500',
		textColor: '#000000'
	},
	RLP: {
		fullName: 'Rashtriya Loktantrik Party',
		backgroundColor: '#ffd42a',
		textColor: '#000000'
	},
	RJD: {
		fullName: 'Rashtriya Janata Dal',
		backgroundColor: '#FF4500',
		textColor: '#FFFFFF'
	},
	RSP: {
		fullName: 'Revolutionary Socialist Party',
		backgroundColor: '#FF8C00',
		textColor: '#FFFFFF'
	},
	SAD: {
		fullName: 'Shiromani Akali Dal',
		backgroundColor: '#0f204a',
		textColor: '#FFFFFF'
	},
	SDF: {
		fullName: 'Sikkim Democratic Front',
		backgroundColor: '#6A5ACD',
		textColor: '#FFFFFF'
	},
	SHS: {
		fullName: 'Shiv Sena',
		backgroundColor: '#f37020',
		textColor: '#FFFFFF'
	},
	SP: {
		fullName: 'Samajwadi Party',
		backgroundColor: '#ff2222',
		textColor: '#FFFFFF'
	},
	BRS: {
		fullName: 'Bharat Rashtra Samithi',
		backgroundColor: '#FF008A',
		textColor: '#FFFFFF'
	},
	TDP: {
		fullName: 'Telugu Desam Party',
		backgroundColor: '#FF008A',
		textColor: '#FFFFFF'
	},
	YSRCP: {
		fullName: 'Yuvajana Sramika Rythu Congress Party',
		backgroundColor: '#FF008A',
		textColor: '#FFFFFF'
	},

	JMM: {
		backgroundColor: '#000080',
		textColor: 'white',
		fullName: 'Jharkhand Mukti Morcha'
	},
	CPI: { backgroundColor: '#FF0000', textColor: 'white', fullName: 'Communist Party of India' },
	VCK: {
		backgroundColor: '#FFA500',
		textColor: 'black',
		fullName: 'Viduthalai Chiruthaigal Katchi'
	},
	ADS: { backgroundColor: '#FFD700', textColor: 'black', fullName: 'Apna Dal (Soneylal)' },
	LJP: { backgroundColor: '#FFA500', textColor: 'black', fullName: 'Lok Janshakti Party' },

	IND: { backgroundColor: '#808080', textColor: 'white', fullName: 'Independent' },
	AITC: {
		backgroundColor: '#008000',
		textColor: 'white',
		fullName: 'All India Trinamool Congress'
	},
	NPP: { backgroundColor: '#FFA500', textColor: 'black', fullName: 'National People’s Party' },

	NDPP: {
		backgroundColor: '#FF6600',
		textColor: 'black',
		fullName: 'Nationalist Democratic Progressive Party'
	},
	SKM: { backgroundColor: '#FF0000', textColor: 'white', fullName: 'Sikkim Krantikari Morcha' },
	JDS: { backgroundColor: '#FF0000', textColor: 'white', fullName: 'Janata Dal (Secular)' }
};
