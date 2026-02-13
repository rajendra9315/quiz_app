let currentUser = null;

/* ================= AUTH ================= */

function register() {
    let u = username.value.trim();
    let p = password.value.trim();

    if (!u || !p) {
        alert("Please enter username & password");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(x => x.u === u)) {
        alert("User already exists. Please login.");
        return;
    }

    users.push({ u, p, history: [] });
    localStorage.setItem("users", JSON.stringify(users));

    currentUser = { u, p, history: [] };

    authSection.classList.add("hidden");
    mainApp.classList.remove("hidden");
    updateLeaderboard();
    initCategories();
}

function login() {
    let u = username.value.trim();
    let p = password.value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(x => x.u === u && x.p === p);

    if (!user) {
        alert("Invalid credentials. Register first if new user.");
        return;
    }

    currentUser = user;

    authSection.classList.add("hidden");
    mainApp.classList.remove("hidden");
    updateLeaderboard();

    initCategories();
    loadHistory();
    updateStats();
}

function logout() {
    location.reload();
}

/* ================= QUESTION BANK ================= */

const questionBank = {

Science:[

{q:"What is the SI unit of electric flux?",o:["Weber","Volt","Newton","Coulomb"],a:0},
{q:"Which particle has zero rest mass?",o:["Electron","Proton","Photon","Neutron"],a:2},
{q:"Entropy measures?",o:["Energy","Disorder","Temperature","Pressure"],a:1},
{q:"Avogadro's number is approximately?",o:["6.022×10^23","3×10^8","9.8","1.6×10^-19"],a:0},
{q:"Which law states F = ma?",o:["Newton's First","Newton's Second","Ohm's Law","Hooke's Law"],a:1},
{q:"What is Planck’s constant related to?",o:["Energy-frequency relation","Speed of light","Gravity","Magnetism"],a:0},
{q:"pH less than 7 indicates?",o:["Base","Neutral","Acid","Salt"],a:2},
{q:"Which gas is most abundant in Earth’s atmosphere?",o:["Oxygen","Nitrogen","Carbon dioxide","Hydrogen"],a:1},
{q:"What is the charge of an electron?",o:["+1.6×10^-19 C","-1.6×10^-19 C","0","+1 C"],a:1},
{q:"Speed of light in vacuum?",o:["3×10^8 m/s","3×10^6 m/s","300 m/s","3×10^5 km/s"],a:0},

{q:"Which element has atomic number 26?",o:["Iron","Copper","Zinc","Nickel"],a:0},
{q:"Which law relates pressure and volume inversely?",o:["Charles Law","Boyle’s Law","Ohm’s Law","Kepler’s Law"],a:1},
{q:"DNA replication occurs in?",o:["Cytoplasm","Nucleus","Ribosome","Mitochondria"],a:1},
{q:"Which force keeps planets in orbit?",o:["Magnetic","Electrostatic","Gravitational","Nuclear"],a:2},
{q:"Half-life refers to?",o:["Time to double mass","Time to decay half substance","Energy lost","Speed reduction"],a:1},
{q:"Which organelle produces ATP?",o:["Ribosome","Mitochondria","Nucleus","Golgi"],a:1},
{q:"What is the unit of frequency?",o:["Hertz","Joule","Newton","Pascal"],a:0},
{q:"Which radiation has highest energy?",o:["Radio","Microwave","Gamma","Infrared"],a:2},
{q:"Acceleration due to gravity on Earth?",o:["9.8 m/s²","8.9 m/s²","10 m/s","7.8 m/s²"],a:0},
{q:"Which gas causes greenhouse effect most?",o:["Oxygen","Nitrogen","Carbon dioxide","Helium"],a:2},

{q:"Which particle determines atomic number?",o:["Neutron","Electron","Proton","Photon"],a:2},
{q:"What is absolute zero in Celsius?",o:["-273°C","0°C","-100°C","-50°C"],a:0},
{q:"Work is measured in?",o:["Joule","Newton","Watt","Volt"],a:0},
{q:"Which blood cells fight infection?",o:["RBC","WBC","Platelets","Plasma"],a:1},
{q:"Which law explains conservation of energy?",o:["First law of thermodynamics","Second law","Hooke’s Law","Pascal’s Law"],a:0},
{q:"Which element is most electronegative?",o:["Fluorine","Oxygen","Chlorine","Hydrogen"],a:0},
{q:"Which wave requires medium?",o:["Light","Sound","Gamma","X-ray"],a:1},
{q:"Unit of electric current?",o:["Ampere","Volt","Ohm","Watt"],a:0},
{q:"Which cell division produces gametes?",o:["Mitosis","Meiosis","Binary fission","Fusion"],a:1},
{q:"Which scientist proposed relativity?",o:["Newton","Einstein","Tesla","Bohr"],a:1},

{q:"Which element is liquid at room temperature?",o:["Mercury","Iron","Gold","Silver"],a:0},
{q:"What is the formula of methane?",o:["CH4","CO2","C2H6","H2O"],a:0},
{q:"Voltage is measured in?",o:["Volt","Ampere","Ohm","Joule"],a:0},
{q:"Which hormone regulates blood sugar?",o:["Insulin","Adrenaline","Thyroxine","Estrogen"],a:0},
{q:"Which bond shares electrons?",o:["Ionic","Covalent","Metallic","Hydrogen"],a:1},
{q:"Which scientist discovered radioactivity?",o:["Curie","Newton","Faraday","Darwin"],a:0},
{q:"Which acid is in stomach?",o:["HCl","H2SO4","HNO3","CH3COOH"],a:0},
{q:"Unit of power?",o:["Watt","Joule","Newton","Volt"],a:0},
{q:"Which organ filters blood?",o:["Heart","Kidney","Liver","Lung"],a:1},
{q:"Which planet has strongest gravity?",o:["Earth","Jupiter","Mars","Venus"],a:1},

{q:"What is the chemical symbol for Sodium?",o:["Na","So","Sn","Sd"],a:0},
{q:"Which scientist developed atomic model with orbits?",o:["Bohr","Rutherford","Dalton","Thomson"],a:0},
{q:"Which metal is best conductor?",o:["Silver","Iron","Copper","Gold"],a:0},
{q:"Which gas is used in photosynthesis?",o:["CO2","O2","N2","H2"],a:0},
{q:"Which lens converges light?",o:["Convex","Concave","Plane","Cylindrical"],a:0},
{q:"What is the boiling point of water at 1 atm?",o:["100°C","90°C","120°C","80°C"],a:0},
{q:"Which vitamin is produced by sunlight?",o:["Vitamin D","Vitamin C","Vitamin A","Vitamin B"],a:0},
{q:"Which particle is found in nucleus?",o:["Proton","Electron","Photon","Neutrino"],a:0},
{q:"Which scale measures earthquake?",o:["Richter","Celsius","Kelvin","Pascal"],a:0},
{q:"Which energy stored in battery?",o:["Chemical","Mechanical","Thermal","Nuclear"],a:0}

],

Math:[

{q:"If log₁₀(2) ≈ 0.3010, then log₁₀(8) equals?",o:["0.9030","0.6020","1.2040","0.3010"],a:0},
{q:"Derivative of sin(x)?",o:["cos(x)","-cos(x)","-sin(x)","tan(x)"],a:0},
{q:"Integral of 1/x dx?",o:["ln|x|","x","1/x","e^x"],a:0},
{q:"If determinant of matrix is zero, matrix is?",o:["Singular","Identity","Diagonal","Orthogonal"],a:0},
{q:"Limit of (1+1/n)^n as n→∞?",o:["e","1","0","Infinity"],a:0},

{q:"If probability of event A is 0.3, probability of not A?",o:["0.7","0.3","1","0"],a:0},
{q:"If f(x)=x², then f'(3)?",o:["6","9","3","12"],a:0},
{q:"Value of π approximately?",o:["3.1416","3.14","3.1","3.2"],a:0},
{q:"Matrix multiplication is?",o:["Non-commutative","Commutative","Always zero","Symmetric"],a:0},
{q:"Variance measures?",o:["Spread","Mean","Median","Mode"],a:0},

{q:"If sin²x + cos²x = ?",o:["1","0","2","-1"],a:0},
{q:"Eigenvalues relate to?",o:["Matrices","Vectors","Scalars","Probability"],a:0},
{q:"Slope of vertical line?",o:["Undefined","0","1","-1"],a:0},
{q:"If x^2 - 5x + 6 = 0, roots are?",o:["2 and 3","1 and 6","-2 and -3","0 and 5"],a:0},
{q:"Laplace transform used in?",o:["Differential equations","Geometry","Arithmetic","Statistics"],a:0},

{q:"Derivative of e^x?",o:["e^x","x e^x","ln(x)","1/x"],a:0},
{q:"If a vector has magnitude zero, it is?",o:["Zero vector","Unit vector","Scalar","Matrix"],a:0},
{q:"Standard deviation is square root of?",o:["Variance","Mean","Median","Mode"],a:0},
{q:"If tanθ = 1, θ equals?",o:["45°","30°","60°","90°"],a:0},
{q:"Inverse of multiplication?",o:["Division","Addition","Subtraction","Power"],a:0},

{q:"If set A has 3 elements, subsets are?",o:["8","6","9","4"],a:0},
{q:"d/dx (x³)?",o:["3x²","x²","3x","x³"],a:0},
{q:"Probability range?",o:["0 to 1","-1 to 1","0 to ∞","1 to ∞"],a:0},
{q:"If cosθ = 0, θ equals?",o:["90°","45°","30°","60°"],a:0},
{q:"Rank of identity matrix?",o:["n","0","1","Undefined"],a:0},

{q:"Derivative of ln(x)?",o:["1/x","ln(x)","x","e^x"],a:0},
{q:"If f(x)=|x|, derivative at 0?",o:["Not defined","0","1","-1"],a:0},
{q:"Mean of symmetric distribution equals?",o:["Median","Mode","Zero","Variance"],a:0},
{q:"If a^m × a^n = ?",o:["a^(m+n)","a^(mn)","a^(m-n)","a^m+n"],a:0},
{q:"Permutation formula?",o:["n!/(n-r)!","n!/r!","n^r","r^n"],a:0},

{q:"Combination formula?",o:["n!/(r!(n-r)!)","n!/r!","n^r","r!"],a:0},
{q:"Integral of cos(x)?",o:["sin(x)","-sin(x)","cos(x)","-cos(x)"],a:0},
{q:"If determinant ≠ 0, matrix is?",o:["Invertible","Singular","Zero","Identity"],a:0},
{q:"If log(a)+log(b)=?",o:["log(ab)","log(a/b)","log(a+b)","log(a-b)"],a:0},
{q:"If A∩B=∅, they are?",o:["Disjoint","Equal","Universal","Subset"],a:0},

{q:"Derivative of tan(x)?",o:["sec²x","cos²x","sin²x","tan²x"],a:0},
{q:"Standard form of quadratic equation?",o:["ax²+bx+c=0","ax+b=0","x²+y²=1","None"],a:0},
{q:"If f(x)=1/x, derivative?",o:["-1/x²","1/x²","x","-x"],a:0},
{q:"If |z|=1 in complex plane, z lies on?",o:["Unit circle","Real axis","Imag axis","Origin"],a:0},
{q:"Angle sum of triangle?",o:["180°","360°","90°","270°"],a:0},

{q:"If mean > median, distribution is?",o:["Positively skewed","Symmetric","Normal","Uniform"],a:0},
{q:"If ∫0¹ x dx = ?",o:["1/2","1","0","2"],a:0},
{q:"If x^0 = ?",o:["1","0","x","Undefined"],a:0},
{q:"If A ⊆ B means?",o:["A subset of B","B subset of A","Equal","Disjoint"],a:0},
{q:"Derivative of constant?",o:["0","1","Constant","Undefined"],a:0},

{q:"If sinθ = 1, θ equals?",o:["90°","0°","45°","30°"],a:0},
{q:"Sum of interior angles of quadrilateral?",o:["360°","180°","90°","270°"],a:0},
{q:"If probability = 1 means?",o:["Certain event","Impossible","Random","Independent"],a:0},
{q:"If matrix A × I = ?",o:["A","I","0","Undefined"],a:0},
{q:"Derivative of x?",o:["1","0","x","Undefined"],a:0}

],

History:[

{q:"The Treaty of Westphalia (1648) ended which war?",o:["Thirty Years' War","Hundred Years' War","Napoleonic Wars","World War I"],a:0},
{q:"Who was the first Governor-General of independent India?",o:["C. Rajagopalachari","Lord Mountbatten","Nehru","Sardar Patel"],a:0},
{q:"The Magna Carta was signed in which year?",o:["1215","1315","1415","1515"],a:0},
{q:"The Glorious Revolution occurred in?",o:["1688","1789","1776","1649"],a:0},
{q:"Who authored 'The Communist Manifesto'?",o:["Marx & Engels","Lenin","Stalin","Trotsky"],a:0},

{q:"The Battle of Plassey took place in?",o:["1757","1764","1773","1748"],a:0},
{q:"Which Mughal ruler built the Peacock Throne?",o:["Shah Jahan","Akbar","Babur","Aurangzeb"],a:0},
{q:"The American Civil War ended in?",o:["1865","1776","1812","1918"],a:0},
{q:"The League of Nations was formed after?",o:["World War I","World War II","Cold War","French Revolution"],a:0},
{q:"Who was the founder of the Mauryan Empire?",o:["Chandragupta Maurya","Ashoka","Bindusara","Harsha"],a:0},

{q:"The French Revolution began in?",o:["1789","1776","1815","1804"],a:0},
{q:"Who introduced the Permanent Settlement in India?",o:["Lord Cornwallis","Warren Hastings","Dalhousie","Curzon"],a:0},
{q:"The Berlin Wall fell in?",o:["1989","1991","1985","1979"],a:0},
{q:"Who was the leader of Bolshevik Revolution?",o:["Lenin","Stalin","Trotsky","Kerensky"],a:0},
{q:"The Quit India Movement was launched in?",o:["1942","1930","1920","1919"],a:0},

{q:"The Renaissance began in which country?",o:["Italy","France","Germany","England"],a:0},
{q:"Who was the first female Prime Minister of UK?",o:["Margaret Thatcher","Theresa May","Indira Gandhi","Angela Merkel"],a:0},
{q:"The Cold War was mainly between?",o:["USA & USSR","UK & Germany","France & Italy","China & Japan"],a:0},
{q:"The Indus Valley Civilization flourished around?",o:["2500 BCE","1500 BCE","500 BCE","1000 CE"],a:0},
{q:"Who defeated Napoleon at Waterloo?",o:["Duke of Wellington","Nelson","Bismarck","Metternich"],a:0},

{q:"The Treaty of Versailles ended?",o:["World War I","World War II","Napoleonic Wars","Crimean War"],a:0},
{q:"Who was known as Iron Chancellor?",o:["Otto von Bismarck","Hitler","Mussolini","Churchill"],a:0},
{q:"The Dandi March occurred in?",o:["1930","1942","1920","1919"],a:0},
{q:"Who was the last Mughal emperor?",o:["Bahadur Shah Zafar","Aurangzeb","Akbar II","Shah Alam II"],a:0},
{q:"The Opium Wars were between China and?",o:["Britain","USA","France","Russia"],a:0},

{q:"Who led the unification of Italy?",o:["Garibaldi","Bismarck","Napoleon","Mazzini"],a:0},
{q:"The Treaty of Tordesillas divided world between?",o:["Spain & Portugal","France & UK","Germany & Italy","USA & Spain"],a:0},
{q:"The Non-Aligned Movement was founded by?",o:["Nehru, Nasser, Tito","Gandhi","Stalin","Kennedy"],a:0},
{q:"The Revolt of 1857 started at?",o:["Meerut","Delhi","Kanpur","Lucknow"],a:0},
{q:"The Meiji Restoration occurred in?",o:["Japan","China","Korea","Vietnam"],a:0},

{q:"Who wrote Arthashastra?",o:["Kautilya","Kalidasa","Chanakya","Panini"],a:0},
{q:"The Cuban Missile Crisis occurred in?",o:["1962","1959","1971","1945"],a:0},
{q:"The Treaty of Ghent ended?",o:["War of 1812","WWI","WWII","Civil War"],a:0},
{q:"The Roman Empire fell in?",o:["476 CE","1066 CE","1492 CE","800 CE"],a:0},
{q:"Who was the first President of USA?",o:["George Washington","Lincoln","Jefferson","Adams"],a:0},

{q:"The Industrial Revolution began in?",o:["Britain","France","USA","Germany"],a:0},
{q:"Who introduced Subsidiary Alliance?",o:["Lord Wellesley","Dalhousie","Cornwallis","Hastings"],a:0},
{q:"The Treaty of Brest-Litovsk was signed by?",o:["Russia","Germany","France","Italy"],a:0},
{q:"The Partition of Bengal occurred in?",o:["1905","1911","1947","1920"],a:0},
{q:"Who founded the Gupta Empire?",o:["Chandragupta I","Samudragupta","Ashoka","Harsha"],a:0},

{q:"The Suez Crisis happened in?",o:["1956","1948","1967","1973"],a:0},
{q:"Who was the architect of Indian Constitution?",o:["B.R. Ambedkar","Nehru","Gandhi","Patel"],a:0},
{q:"The Council of Trent was part of?",o:["Counter-Reformation","Reformation","Renaissance","Enlightenment"],a:0},
{q:"The Enlightenment emphasized?",o:["Reason","Faith","Tradition","Monarchy"],a:0},
{q:"The Boxer Rebellion occurred in?",o:["China","Japan","India","Korea"],a:0},

{q:"The Treaty of Paris (1783) ended?",o:["American Revolution","WWI","Napoleonic War","Civil War"],a:0},
{q:"Who was the first Emperor of Rome?",o:["Augustus","Caesar","Nero","Constantine"],a:0},
{q:"The Green Revolution in India started in?",o:["1960s","1950s","1970s","1940s"],a:0},
{q:"The Sepoy Mutiny is also known as?",o:["First War of Independence","Civil War","Rebellion","Peasant Revolt"],a:0},
{q:"Who was the last Viceroy of India?",o:["Lord Mountbatten","Curzon","Irwin","Dalhousie"],a:0}

],

Geography:[

{q:"Which layer of atmosphere contains ozone layer?",o:["Stratosphere","Troposphere","Mesosphere","Thermosphere"],a:0},
{q:"Which is the largest ocean by area?",o:["Pacific","Atlantic","Indian","Arctic"],a:0},
{q:"The Tropic of Cancer passes through how many Indian states?",o:["8","6","10","5"],a:0},
{q:"Which river forms the Grand Canyon?",o:["Colorado","Mississippi","Amazon","Nile"],a:0},
{q:"The Ring of Fire is associated with?",o:["Volcanoes","Deserts","Forests","Glaciers"],a:0},

{q:"Which country has the longest coastline?",o:["Canada","Russia","Australia","USA"],a:0},
{q:"Which desert is the largest hot desert?",o:["Sahara","Gobi","Thar","Arabian"],a:0},
{q:"Which current is warm?",o:["Gulf Stream","Labrador","Peru","Canary"],a:0},
{q:"El Niño affects?",o:["Pacific Ocean","Atlantic","Indian Ocean","Arctic"],a:0},
{q:"Which plateau is called 'Roof of the World'?",o:["Tibetan Plateau","Deccan Plateau","Iran Plateau","Mongolian Plateau"],a:0},

{q:"Which strait separates Asia and North America?",o:["Bering Strait","Malacca","Hormuz","Gibraltar"],a:0},
{q:"Which is the deepest ocean trench?",o:["Mariana Trench","Java Trench","Peru Trench","Tonga Trench"],a:0},
{q:"Which country has most time zones?",o:["France","Russia","USA","China"],a:0},
{q:"Which soil is best for cotton?",o:["Black soil","Alluvial","Red","Laterite"],a:0},
{q:"Which river is known as Sorrow of Bihar?",o:["Kosi","Ganga","Yamuna","Brahmaputra"],a:0},

{q:"Which is the largest delta in world?",o:["Ganga-Brahmaputra","Nile","Amazon","Mississippi"],a:0},
{q:"Which city lies on Equator?",o:["Quito","Nairobi","Jakarta","Singapore"],a:0},
{q:"Which continent has no permanent rivers?",o:["Antarctica","Europe","Australia","Africa"],a:0},
{q:"Which country is landlocked?",o:["Nepal","Japan","Indonesia","UK"],a:0},
{q:"Which mountain range separates Europe & Asia?",o:["Ural","Alps","Himalayas","Andes"],a:0},

{q:"Which river is longest in world?",o:["Nile","Amazon","Yangtze","Mississippi"],a:0},
{q:"Which is largest island?",o:["Greenland","Madagascar","Borneo","New Guinea"],a:0},
{q:"Which city is below sea level?",o:["Amsterdam","Delhi","Rome","Tokyo"],a:0},
{q:"Which country is largest producer of coffee?",o:["Brazil","Vietnam","Colombia","India"],a:0},
{q:"Which continent is largest by area?",o:["Asia","Africa","Europe","America"],a:0},

{q:"Which ocean is saltiest?",o:["Atlantic","Pacific","Indian","Arctic"],a:0},
{q:"Which country shares most borders?",o:["China","India","Russia","Brazil"],a:0},
{q:"Which capital is highest altitude?",o:["La Paz","Kathmandu","Quito","Bogota"],a:0},
{q:"Which desert is cold desert?",o:["Gobi","Sahara","Thar","Arabian"],a:0},
{q:"Which wind blows from sea to land?",o:["Sea breeze","Land breeze","Monsoon","Trade wind"],a:0},

{q:"Which region experiences Mediterranean climate?",o:["Southern Europe","Central Asia","Amazon","Greenland"],a:0},
{q:"Which is largest freshwater lake?",o:["Lake Superior","Lake Victoria","Caspian Sea","Baikal"],a:0},
{q:"Which country has most volcanoes?",o:["Indonesia","Japan","USA","Italy"],a:0},
{q:"Which is driest place on Earth?",o:["Atacama Desert","Sahara","Thar","Gobi"],a:0},
{q:"Which river crosses most countries?",o:["Danube","Nile","Amazon","Ganga"],a:0},

{q:"Which is highest waterfall?",o:["Angel Falls","Niagara","Victoria","Iguazu"],a:0},
{q:"Which continent has most population?",o:["Asia","Africa","Europe","America"],a:0},
{q:"Which strait connects Mediterranean to Atlantic?",o:["Gibraltar","Hormuz","Malacca","Bering"],a:0},
{q:"Which is largest coral reef system?",o:["Great Barrier Reef","Red Sea Reef","Belize Reef","Maldives Reef"],a:0},
{q:"Which river flows through Paris?",o:["Seine","Thames","Danube","Rhine"],a:0},

{q:"Which plateau is richest in minerals in India?",o:["Chota Nagpur","Deccan","Malwa","Mysore"],a:0},
{q:"Which ocean surrounds Maldives?",o:["Indian Ocean","Pacific","Atlantic","Arctic"],a:0},
{q:"Which is smallest continent?",o:["Australia","Europe","Antarctica","Africa"],a:0},
{q:"Which country is called Land of Rising Sun?",o:["Japan","China","Korea","Thailand"],a:0},
{q:"Which river originates from Tibet?",o:["Brahmaputra","Ganga","Godavari","Krishna"],a:0},

{q:"Which is major greenhouse gas?",o:["CO2","Oxygen","Nitrogen","Hydrogen"],a:0},
{q:"Which wind causes Indian monsoon?",o:["Southwest monsoon","Trade wind","Westerlies","Polar wind"],a:0},
{q:"Which city is called Eternal City?",o:["Rome","Paris","Athens","London"],a:0},
{q:"Which region produces most petroleum?",o:["Middle East","Europe","Africa","Australia"],a:0},
{q:"Which river is sacred in Egypt?",o:["Nile","Amazon","Yangtze","Danube"],a:0}

],

Sports:[

{q:"Olympic Games revived in modern era in?",o:["1896","1900","1880","1912"],a:0},
{q:"Which country has won most Olympic medals overall?",o:["USA","China","Russia","Germany"],a:0},
{q:"FIFA World Cup held every?",o:["4 years","2 years","3 years","5 years"],a:0},
{q:"ICC headquarters located in?",o:["Dubai","London","Mumbai","Sydney"],a:0},
{q:"Which country invented cricket?",o:["England","India","Australia","South Africa"],a:0},

{q:"Which tennis tournament played on clay?",o:["French Open","Wimbledon","US Open","Australian Open"],a:0},
{q:"Which athlete has most Olympic gold medals?",o:["Michael Phelps","Usain Bolt","Carl Lewis","Mark Spitz"],a:0},
{q:"NBA is league of which country?",o:["USA","Canada","UK","Spain"],a:0},
{q:"Which country won FIFA 2018?",o:["France","Brazil","Germany","Argentina"],a:0},
{q:"Which Grand Slam played on grass?",o:["Wimbledon","French Open","US Open","Australian Open"],a:0},

{q:"Duckworth-Lewis method used in?",o:["Cricket","Football","Tennis","Hockey"],a:0},
{q:"Which sport uses Ryder Cup?",o:["Golf","Tennis","Cricket","Rugby"],a:0},
{q:"Which country hosts Formula 1 Monaco GP?",o:["Monaco","Italy","Spain","France"],a:0},
{q:"Which is highest individual score in ODI cricket?",o:["264","200","250","300"],a:0},
{q:"Which body governs global football?",o:["FIFA","UEFA","ICC","IOC"],a:0},

{q:"Which city hosted 2016 Olympics?",o:["Rio de Janeiro","Tokyo","London","Beijing"],a:0},
{q:"Which country has won most Cricket World Cups?",o:["Australia","India","England","Pakistan"],a:0},
{q:"Which sport uses term 'home run'?",o:["Baseball","Cricket","Rugby","Football"],a:0},
{q:"Which race is 42.195 km?",o:["Marathon","Half marathon","Sprint","Ultra"],a:0},
{q:"Which tennis player has most Grand Slam titles (Men)?",o:["Novak Djokovic","Federer","Nadal","Sampras"],a:0},

{q:"Which country won Rugby World Cup 2019?",o:["South Africa","England","New Zealand","Australia"],a:0},
{q:"Which league is top football league in England?",o:["Premier League","La Liga","Serie A","Bundesliga"],a:0},
{q:"Which cricketer known as 'God of Cricket'?",o:["Sachin Tendulkar","Kohli","Ponting","Lara"],a:0},
{q:"Which Olympic sport uses pommel horse?",o:["Gymnastics","Athletics","Swimming","Boxing"],a:0},
{q:"Which event part of decathlon?",o:["100m","Marathon","Swimming","Cycling"],a:0},

{q:"Which sport uses term 'love'?",o:["Tennis","Football","Cricket","Hockey"],a:0},
{q:"Which footballer won Ballon d'Or most times?",o:["Lionel Messi","Ronaldo","Modric","Zidane"],a:0},
{q:"Which is national sport of Japan?",o:["Sumo","Baseball","Football","Karate"],a:0},
{q:"Which format introduced in cricket in 2003?",o:["T20","ODI","Test","The Hundred"],a:0},
{q:"Which sport features Stanley Cup?",o:["Ice Hockey","Basketball","Football","Cricket"],a:0},

{q:"Which boxer known as 'The Greatest'?",o:["Muhammad Ali","Tyson","Mayweather","Holyfield"],a:0},
{q:"Which country won 2022 FIFA World Cup?",o:["Argentina","France","Brazil","Germany"],a:0},
{q:"Which tournament known as 'The Ashes'?",o:["Cricket series","Football cup","Tennis match","Rugby league"],a:0},
{q:"Which sport uses term 'checkmate'?",o:["Chess","Tennis","Football","Hockey"],a:0},
{q:"Which country hosts Wimbledon?",o:["UK","USA","France","Australia"],a:0},

{q:"Which Indian athlete won Olympic gold in javelin?",o:["Neeraj Chopra","Milkha Singh","PT Usha","Abhinav Bindra"],a:0},
{q:"Which country dominates table tennis globally?",o:["China","Japan","Germany","USA"],a:0},
{q:"Which sport uses VAR technology?",o:["Football","Cricket","Tennis","Hockey"],a:0},
{q:"Which cricket league is richest?",o:["IPL","BBL","PSL","CPL"],a:0},
{q:"Which city hosts US Open tennis?",o:["New York","Los Angeles","Chicago","Miami"],a:0},

{q:"Which team won NBA 2023 championship?",o:["Denver Nuggets","Lakers","Warriors","Celtics"],a:0},
{q:"Which Olympic sport includes foil & sabre?",o:["Fencing","Boxing","Archery","Shooting"],a:0},
{q:"Which country won most medals Tokyo 2020?",o:["USA","China","Japan","UK"],a:0},
{q:"Which sport uses term 'LBW'?",o:["Cricket","Football","Rugby","Baseball"],a:0},
{q:"Which race is shortest in athletics?",o:["100m","200m","400m","800m"],a:0},

{q:"Which Indian shooter won Olympic gold?",o:["Abhinav Bindra","Gagan Narang","Manu Bhaker","Saurabh"],a:0},
{q:"Which sport has Davis Cup?",o:["Tennis","Football","Cricket","Hockey"],a:0},
{q:"Which football club has most Champions League titles?",o:["Real Madrid","Barcelona","Bayern","Liverpool"],a:0},
{q:"Which country hosts Tour de France?",o:["France","Italy","Spain","Belgium"],a:0},
{q:"Which is highest governing body of Olympics?",o:["IOC","FIFA","ICC","NBA"],a:0}

],


Technology:[

{q:"Artificial Intelligence primarily aims to?",o:["Simulate human intelligence","Replace hardware","Increase RAM","Speed internet"],a:0},
{q:"Machine learning is subset of?",o:["Artificial Intelligence","Blockchain","Networking","Databases"],a:0},
{q:"Which algorithm used in supervised learning?",o:["Linear Regression","K-means","Apriori","Hashing"],a:0},
{q:"Deep learning uses?",o:["Neural networks","Sorting","Binary trees","Databases"],a:0},
{q:"Cloud computing provides?",o:["On-demand resources","Hardware sales","Offline storage","CD drives"],a:0},

{q:"IaaS stands for?",o:["Infrastructure as a Service","Internet as a Service","Interface as a Service","Integration as a Service"],a:0},
{q:"Blockchain ensures?",o:["Decentralization","Central control","Single authority","Manual ledger"],a:0},
{q:"Bitcoin uses which consensus?",o:["Proof of Work","Proof of Speed","Proof of RAM","Proof of Data"],a:0},
{q:"Which company developed TensorFlow?",o:["Google","Microsoft","Amazon","IBM"],a:0},
{q:"Edge computing reduces?",o:["Latency","Bandwidth","Security","Memory"],a:0},

{q:"5G primarily improves?",o:["Speed & latency","Battery life","Screen size","Storage"],a:0},
{q:"Which is NoSQL database?",o:["MongoDB","MySQL","PostgreSQL","Oracle"],a:0},
{q:"Which language popular for AI?",o:["Python","HTML","CSS","Assembly"],a:0},
{q:"API stands for?",o:["Application Programming Interface","Advanced Program Integration","Application Protocol Interface","None"],a:0},
{q:"DevOps combines?",o:["Development & Operations","Devices & Options","Data & Output","None"],a:0},

{q:"Virtualization creates?",o:["Virtual machines","Extra CPUs","Extra RAM","Extra disks"],a:0},
{q:"Which is containerization tool?",o:["Docker","Excel","Chrome","Photoshop"],a:0},
{q:"Which cloud model is private?",o:["Private cloud","Public cloud","Hybrid only","Open cloud"],a:0},
{q:"IoT stands for?",o:["Internet of Things","Internal Online Tech","Input Output Tech","None"],a:0},
{q:"Which protocol used for IoT messaging?",o:["MQTT","HTTP only","FTP","SMTP"],a:0},

{q:"Quantum computing uses?",o:["Qubits","Bits","Bytes","RAM"],a:0},
{q:"Which company developed Azure?",o:["Microsoft","Google","Amazon","IBM"],a:0},
{q:"Which service is SaaS?",o:["Google Docs","AWS EC2","Docker","Linux"],a:0},
{q:"Cyber-physical systems integrate?",o:["Computing & physical processes","Only hardware","Only software","Manual control"],a:0},
{q:"Which language used for smart contracts?",o:["Solidity","Python","C","HTML"],a:0},

{q:"Big Data characterized by?",o:["Volume, Velocity, Variety","Speed only","Size only","Storage only"],a:0},
{q:"Which tool used for data visualization?",o:["Tableau","Linux","Docker","Git"],a:0},
{q:"Which company developed Kubernetes?",o:["Google","Amazon","Microsoft","IBM"],a:0},
{q:"Microservices architecture promotes?",o:["Modularity","Monolithic system","Single server","Manual coding"],a:0},
{q:"Which is distributed version control?",o:["Git","SVN only","FTP","HTTP"],a:0},

{q:"Augmented Reality overlays?",o:["Digital on real world","Virtual world only","Nothing","Data only"],a:0},
{q:"Which is example of biometric security?",o:["Fingerprint","Password","PIN","Captcha"],a:0},
{q:"NLP stands for?",o:["Natural Language Processing","Network Layer Protocol","Non Linear Programming","None"],a:0},
{q:"Which algorithm used in clustering?",o:["K-means","Linear Regression","Binary search","Quick sort"],a:0},
{q:"Which is relational database?",o:["MySQL","MongoDB","Cassandra","Redis"],a:0},

{q:"Which company created React?",o:["Facebook","Google","Microsoft","Apple"],a:0},
{q:"Which storage is fastest?",o:["SSD","HDD","Tape","DVD"],a:0},
{q:"Which protocol used for email sending?",o:["SMTP","HTTP","FTP","SSH"],a:0},
{q:"Which language mainly used for Android apps?",o:["Kotlin","Swift","C#","Ruby"],a:0},
{q:"Which AI technique uses rewards?",o:["Reinforcement learning","Supervised","Unsupervised","None"],a:0},

{q:"Which cloud is combination of public & private?",o:["Hybrid","Edge","Dedicated","Secure"],a:0},
{q:"Which database stores graph data?",o:["Neo4j","MySQL","Oracle","MongoDB"],a:0},
{q:"Which is front-end framework?",o:["React","Node.js","Django","Spring"],a:0},
{q:"Which is back-end framework?",o:["Django","React","HTML","CSS"],a:0},
{q:"Which technology supports cryptocurrency?",o:["Blockchain","Cloud","IoT","API"],a:0},

{q:"Which metric measures model accuracy?",o:["Precision","Latency","Bandwidth","Cache"],a:0},
{q:"Which storage uses magnetic disks?",o:["HDD","SSD","RAM","ROM"],a:0},
{q:"Which protocol resolves domain names?",o:["DNS","FTP","HTTP","SMTP"],a:0},
{q:"Which technology used in self-driving cars?",o:["AI & sensors","Manual coding","Basic C","HTML"],a:0},
{q:"Which is server-side language?",o:["Node.js","HTML","CSS","XML"],a:0},

{q:"Which is open-source OS?",o:["Linux","Windows","MacOS","iOS"],a:0},
{q:"Which AI model architecture used for language models?",o:["Transformer","CNN","RNN only","GAN only"],a:0},
{q:"Which tech reduces single point failure?",o:["Distributed systems","Central server","Manual backup","Local storage"],a:0},
{q:"Which platform provides cloud computing?",o:["AWS","Excel","Photoshop","VLC"],a:0},
{q:"Which cybersecurity tech encrypts web traffic?",o:["TLS","FTP","SMTP","POP3"],a:0}

],


Programming:[

{q:"Time complexity of binary search?",o:["O(log n)","O(n)","O(n log n)","O(1)"],a:0},
{q:"Worst case of quicksort?",o:["O(n²)","O(n log n)","O(log n)","O(n)"],a:0},
{q:"Stack follows which principle?",o:["LIFO","FIFO","LILO","FILO"],a:0},
{q:"Queue follows?",o:["FIFO","LIFO","LILO","None"],a:0},
{q:"Binary tree max children per node?",o:["2","3","4","Unlimited"],a:0},

{q:"Heap is implemented using?",o:["Array","Linked List","Stack","Queue"],a:0},
{q:"Primary key must be?",o:["Unique","Null","Duplicate","Optional"],a:0},
{q:"Normalization reduces?",o:["Redundancy","Speed","Memory","Security"],a:0},
{q:"Which is not OOP concept?",o:["Compilation","Encapsulation","Inheritance","Polymorphism"],a:0},
{q:"Abstract class can?",o:["Have abstract methods","Be instantiated","Be final","None"],a:0},

{q:"Which data structure uses recursion heavily?",o:["Tree","Array","Stack","Queue"],a:0},
{q:"Hash table average search time?",o:["O(1)","O(n)","O(log n)","O(n²)"],a:0},
{q:"SQL stands for?",o:["Structured Query Language","Simple Query Language","Sequential Query Language","System Query Language"],a:0},
{q:"Which sorting is stable?",o:["Merge Sort","Quick Sort","Heap Sort","Selection Sort"],a:0},
{q:"Big-O describes?",o:["Upper bound","Exact time","Lower bound","Memory only"],a:0},

{q:"Deadlock occurs due to?",o:["Resource circular wait","Memory overflow","Compilation error","Syntax error"],a:0},
{q:"Which traversal uses stack?",o:["DFS","BFS","Level order","None"],a:0},
{q:"BFS uses?",o:["Queue","Stack","Array","Tree"],a:0},
{q:"Binary search requires?",o:["Sorted array","Unsorted array","Linked list","Graph"],a:0},
{q:"Polymorphism achieved by?",o:["Method overloading","Looping","Inheritance only","None"],a:0},

{q:"Which is non-linear data structure?",o:["Graph","Array","Stack","Queue"],a:0},
{q:"Compiler translates?",o:["High-level to machine","Machine to high","Binary to decimal","None"],a:0},
{q:"Virtual memory uses?",o:["Paging","Stack","Queue","Sorting"],a:0},
{q:"Semaphore used for?",o:["Process synchronization","Sorting","Memory allocation","Compilation"],a:0},
{q:"Which is dynamic data structure?",o:["Linked List","Array","Matrix","Tuple"],a:0},

{q:"ACID properties relate to?",o:["Database","Network","OS","Compiler"],a:0},
{q:"Which is greedy algorithm example?",o:["Dijkstra","Bubble Sort","Binary Search","DFS"],a:0},
{q:"Time complexity of merge sort?",o:["O(n log n)","O(n²)","O(n)","O(log n)"],a:0},
{q:"Stack overflow occurs when?",o:["Memory limit exceeded","Heap full","Syntax error","Null pointer"],a:0},
{q:"Which language supports OOP fully?",o:["Java","C","Assembly","HTML"],a:0},

{q:"Which search is fastest for sorted data?",o:["Binary Search","Linear Search","Jump Search","None"],a:0},
{q:"Which is not relational database?",o:["MongoDB","MySQL","PostgreSQL","Oracle"],a:0},
{q:"Inheritance allows?",o:["Code reuse","Encapsulation only","Security","None"],a:0},
{q:"Which structure best for priority?",o:["Heap","Stack","Queue","Array"],a:0},
{q:"Graph edges stored using?",o:["Adjacency list","Stack","Queue","Matrix only"],a:0},

{q:"Which protocol for web?",o:["HTTP","FTP","SMTP","TCP"],a:0},
{q:"Which is interpreted language?",o:["Python","C","C++","Assembly"],a:0},
{q:"Which keyword creates object in Java?",o:["new","class","void","static"],a:0},
{q:"Which is not primitive type in Java?",o:["String","int","float","double"],a:0},
{q:"Encapsulation hides?",o:["Data","Loop","Function","File"],a:0},

{q:"Which is NP-complete problem?",o:["Traveling Salesman","Sorting","Binary Search","Addition"],a:0},
{q:"Recursion needs?",o:["Base condition","Loop","Variable","Array"],a:0},
{q:"Which is depth-first structure?",o:["Stack","Queue","Array","Graph"],a:0},
{q:"Which is breadth-first structure?",o:["Queue","Stack","Heap","Tree"],a:0},
{q:"Compiler error detected at?",o:["Compile time","Run time","Execution","Linking only"],a:0},

{q:"Which data structure uses key-value pair?",o:["HashMap","Stack","Queue","Tree"],a:0},
{q:"Which sorting is in-place?",o:["Quick Sort","Merge Sort","Counting Sort","Radix Sort"],a:0},
{q:"Operating system manages?",o:["Resources","Only CPU","Only memory","Only disk"],a:0},
{q:"Process scheduling is done by?",o:["OS","Compiler","Database","Program"],a:0},
{q:"Which is not OOP feature?",o:["Linking","Encapsulation","Polymorphism","Abstraction"],a:0},

{q:"Which is shortest path algorithm?",o:["Dijkstra","Bubble","Insertion","Heap"],a:0},
{q:"Database index improves?",o:["Search speed","Security","Memory","Redundancy"],a:0},
{q:"Which memory is fastest?",o:["Cache","RAM","ROM","Disk"],a:0},
{q:"Which is concurrency issue?",o:["Race condition","Sorting","Parsing","Compiling"],a:0},
{q:"Which layer in OSI handles routing?",o:["Network layer","Application","Transport","Physical"],a:0}

],


GK:[

{q:"Which country hosts the International Court of Justice?",o:["Netherlands","USA","France","Switzerland"],a:0},
{q:"UNO was established in?",o:["1945","1919","1939","1950"],a:0},
{q:"Which organization monitors global health?",o:["WHO","IMF","WTO","UNESCO"],a:0},
{q:"BRICS includes?",o:["Brazil","Germany","Japan","UK"],a:0},
{q:"Largest democracy in world?",o:["India","USA","Brazil","Indonesia"],a:0},

{q:"NATO headquarters located in?",o:["Brussels","Paris","Washington","London"],a:0},
{q:"IMF headquarters located in?",o:["Washington DC","Geneva","New York","London"],a:0},
{q:"Which country launched first satellite?",o:["USSR","USA","China","India"],a:0},
{q:"ISRO headquarters located in?",o:["Bengaluru","Delhi","Mumbai","Hyderabad"],a:0},
{q:"First Nobel Prize awarded in?",o:["1901","1895","1910","1920"],a:0},

{q:"Which country is permanent UNSC member?",o:["China","India","Brazil","Germany"],a:0},
{q:"World Trade Organization established in?",o:["1995","1980","2000","1975"],a:0},
{q:"G20 includes how many countries?",o:["19 + EU","20","21","25"],a:0},
{q:"Which is highest civilian award in India?",o:["Bharat Ratna","Padma Vibhushan","Padma Shri","Ashoka Chakra"],a:0},
{q:"Which river passes through maximum countries?",o:["Danube","Nile","Amazon","Ganga"],a:0},

{q:"Which is smallest country by area?",o:["Vatican City","Monaco","Maldives","Bhutan"],a:0},
{q:"Euro is currency of?",o:["European Union","UK","USA","Japan"],a:0},
{q:"World Bank headquarters in?",o:["Washington DC","Paris","Geneva","London"],a:0},
{q:"SAARC headquarters in?",o:["Kathmandu","Delhi","Colombo","Dhaka"],a:0},
{q:"ASEAN primarily in?",o:["Southeast Asia","Europe","Africa","South America"],a:0},

{q:"Which country has largest oil reserves?",o:["Venezuela","Saudi Arabia","USA","Russia"],a:0},
{q:"Which country is not part of G7?",o:["China","USA","UK","France"],a:0},
{q:"Which city hosts UN headquarters?",o:["New York","Geneva","Vienna","Paris"],a:0},
{q:"Paris Agreement relates to?",o:["Climate change","Trade","War","Health"],a:0},
{q:"Which country recently joined NATO (2023)?",o:["Finland","India","Brazil","Japan"],a:0},

{q:"International Criminal Court located in?",o:["The Hague","London","New York","Geneva"],a:0},
{q:"Which is fastest growing major economy (recent years)?",o:["India","USA","Japan","Germany"],a:0},
{q:"Which country leads in semiconductor production?",o:["Taiwan","India","USA","Russia"],a:0},
{q:"Which space agency launched Artemis mission?",o:["NASA","ISRO","ESA","Roscosmos"],a:0},
{q:"Which body regulates global aviation?",o:["ICAO","WHO","IMF","UNICEF"],a:0},

{q:"Which country won FIFA World Cup 2022?",o:["Argentina","France","Brazil","Germany"],a:0},
{q:"Which summit focuses on climate action?",o:["COP","G7","BRICS","NATO"],a:0},
{q:"Which is largest continent?",o:["Asia","Africa","Europe","Australia"],a:0},
{q:"Which country is known as Land of Midnight Sun?",o:["Norway","Japan","Canada","Russia"],a:0},
{q:"Which country has highest population?",o:["India","China","USA","Indonesia"],a:0},

{q:"Which country hosts Davos summit?",o:["Switzerland","USA","Germany","France"],a:0},
{q:"World Health Day observed on?",o:["7 April","1 May","5 June","10 December"],a:0},
{q:"Which is largest ocean?",o:["Pacific","Atlantic","Indian","Arctic"],a:0},
{q:"Which country has highest GDP?",o:["USA","China","Japan","Germany"],a:0},
{q:"Which international body awards Nobel Peace Prize?",o:["Norwegian Committee","UN","WHO","Sweden Govt"],a:0},

{q:"Which Indian mission aimed at solar study?",o:["Aditya-L1","Chandrayaan","Mangalyaan","Gaganyaan"],a:0},
{q:"Which country is not in BRICS?",o:["Japan","India","China","Russia"],a:0},
{q:"Which country leads in renewable energy capacity?",o:["China","USA","Germany","India"],a:0},
{q:"Which body regulates global telecom standards?",o:["ITU","WHO","UNICEF","FAO"],a:0},
{q:"Which is longest river in Asia?",o:["Yangtze","Ganga","Mekong","Indus"],a:0},

{q:"Which country signed Abraham Accords with Israel?",o:["UAE","India","China","Japan"],a:0},
{q:"Which organization deals with atomic energy?",o:["IAEA","WHO","IMF","UNESCO"],a:0},
{q:"Which country is largest exporter of rice?",o:["India","China","Thailand","USA"],a:0},
{q:"Which global forum held annually in Davos?",o:["World Economic Forum","G20","UNGA","BRICS"],a:0},
{q:"Which organization deals with global labor standards?",o:["ILO","WHO","IMF","UNICEF"],a:0},

{q:"Which Indian state has longest coastline?",o:["Gujarat","Tamil Nadu","Maharashtra","Kerala"],a:0},
{q:"Which country developed ChatGPT?",o:["USA","China","India","UK"],a:0},
{q:"Which year did India become republic?",o:["1950","1947","1952","1962"],a:0},
{q:"Which Indian mission aims human spaceflight?",o:["Gaganyaan","Aditya","Chandrayaan","Mangalyaan"],a:0},
{q:"Which is largest democracy alliance group?",o:["G7","BRICS","SAARC","ASEAN"],a:0}

],


Physics:[

{q:"What is the dimensional formula of force?",o:["MLT^-2","ML^2T^-2","M^2LT^-2","MLT^2"],a:0},
{q:"If velocity is constant, acceleration is?",o:["Zero","Positive","Negative","Infinite"],a:0},
{q:"Unit of angular momentum?",o:["kg·m²/s","kg·m/s","N·m","Joule"],a:0},
{q:"Escape velocity depends on?",o:["Mass & radius","Only mass","Only radius","Temperature"],a:0},
{q:"Work done in circular motion?",o:["Zero","Maximum","Infinite","Constant"],a:0},

{q:"Unit of electric field?",o:["N/C","Volt","Ohm","Tesla"],a:0},
{q:"Capacitance unit?",o:["Farad","Henry","Weber","Tesla"],a:0},
{q:"Gauss law relates to?",o:["Electric flux","Magnetism","Motion","Energy"],a:0},
{q:"Magnetic field unit?",o:["Tesla","Volt","Ampere","Coulomb"],a:0},
{q:"Ohm's Law states?",o:["V=IR","P=VI","F=ma","E=mc²"],a:0},

{q:"Photoelectric effect explained by?",o:["Einstein","Newton","Bohr","Planck"],a:0},
{q:"Momentum conservation applies in?",o:["Closed system","Open system","Isolated mass","Free fall"],a:0},
{q:"Unit of pressure?",o:["Pascal","Joule","Newton","Watt"],a:0},
{q:"Hooke's Law relates to?",o:["Elasticity","Electricity","Magnetism","Gravity"],a:0},
{q:"Gravitational constant symbol?",o:["G","g","F","M"],a:0},

{q:"Second law of thermodynamics deals with?",o:["Entropy","Energy","Mass","Momentum"],a:0},
{q:"Heat engine efficiency always?",o:["<100%","100%","0%","Infinite"],a:0},
{q:"Unit of frequency?",o:["Hertz","Volt","Tesla","Henry"],a:0},
{q:"Simple harmonic motion restoring force proportional to?",o:["Displacement","Velocity","Acceleration","Time"],a:0},
{q:"Resonance occurs when?",o:["Frequency matches natural frequency","Zero frequency","Infinite force","No damping"],a:0},

{q:"Snell’s law relates to?",o:["Refraction","Reflection","Diffraction","Interference"],a:0},
{q:"Power of lens unit?",o:["Diopter","Watt","Newton","Volt"],a:0},
{q:"Total internal reflection requires?",o:["Denser to rarer","Rarer to denser","Vacuum","Mirror"],a:0},
{q:"Unit of magnetic flux?",o:["Weber","Tesla","Henry","Coulomb"],a:0},
{q:"Faraday’s law relates to?",o:["Electromagnetic induction","Gravity","Motion","Entropy"],a:0},

{q:"Nuclear fission releases energy due to?",o:["Mass defect","Fusion","Ionization","Magnetism"],a:0},
{q:"Half-life formula involves?",o:["Decay constant","Velocity","Acceleration","Force"],a:0},
{q:"Energy of photon equals?",o:["hf","mc²","½mv²","qV"],a:0},
{q:"Compton effect proves?",o:["Particle nature of light","Wave only","Magnetism","Gravity"],a:0},
{q:"Planck constant unit?",o:["J·s","J","s","W"],a:0},

{q:"Torque equals?",o:["r×F","F/r","F+r","r/F"],a:0},
{q:"Angular velocity unit?",o:["rad/s","m/s","N","J"],a:0},
{q:"Moment of inertia depends on?",o:["Mass distribution","Velocity","Time","Temperature"],a:0},
{q:"Centripetal force direction?",o:["Towards center","Away","Upward","Downward"],a:0},
{q:"Bernoulli’s principle relates to?",o:["Fluid pressure","Heat","Electricity","Light"],a:0},

{q:"Young's modulus measures?",o:["Elasticity","Pressure","Heat","Force"],a:0},
{q:"Doppler effect relates to?",o:["Frequency shift","Mass change","Temperature","Force"],a:0},
{q:"Unit of power?",o:["Watt","Joule","Volt","Newton"],a:0},
{q:"Absolute zero equals?",o:["0 K","273 K","-100°C","100°C"],a:0},
{q:"Radiation heat transfer needs?",o:["No medium","Solid","Liquid","Gas"],a:0},

{q:"Electromagnetic waves travel in?",o:["Vacuum","Only air","Only water","Only solids"],a:0},
{q:"Unit of resistance?",o:["Ohm","Volt","Ampere","Watt"],a:0},
{q:"Lenz’s law related to?",o:["Direction of induced current","Gravity","Pressure","Motion"],a:0},
{q:"Specific heat capacity unit?",o:["J/kgK","W/m","N/m","Coulomb"],a:0},
{q:"Heat transferred equals?",o:["mcΔT","F=ma","V=IR","E=mc²"],a:0},

{q:"If net force zero, motion is?",o:["Constant velocity","Acceleration","Stopped","Infinite"],a:0},
{q:"Impulse equals?",o:["Force×time","Force/time","Mass×velocity","Energy"],a:0},
{q:"Electrostatic force follows?",o:["Inverse square law","Linear law","Cubic law","Log law"],a:0},
{q:"Unit of charge?",o:["Coulomb","Ampere","Volt","Tesla"],a:0},
{q:"Nuclear fusion occurs in?",o:["Sun","Earth core","Moon","Ocean"],a:0}

],

Chemistry:[

{q:"Atomic number represents?",o:["Number of protons","Number of neutrons","Mass number","Electrons only"],a:0},
{q:"Avogadro's number equals?",o:["6.022×10^23","3×10^8","9.8","1.6×10^-19"],a:0},
{q:"pH of strong acid is?",o:["<7","7",">7","14"],a:0},
{q:"Which is strongest acid?",o:["HClO4","HCl","H2SO4","HNO3"],a:0},
{q:"Hybridization of methane?",o:["sp3","sp2","sp","dsp2"],a:0},

{q:"Oxidation means?",o:["Loss of electrons","Gain of electrons","Gain of proton","Loss of oxygen"],a:0},
{q:"Reduction means?",o:["Gain of electrons","Loss of electrons","Gain of oxygen","Loss of proton"],a:0},
{q:"Which gas is noble?",o:["Neon","Nitrogen","Oxygen","Hydrogen"],a:0},
{q:"Periodic table arranged by?",o:["Atomic number","Mass","Valency","Electrons"],a:0},
{q:"Which bond involves sharing?",o:["Covalent","Ionic","Metallic","Hydrogen"],a:0},

{q:"Ideal gas law is?",o:["PV=nRT","V=IR","E=mc²","F=ma"],a:0},
{q:"Catalyst increases?",o:["Reaction rate","Yield always","Temperature","Pressure"],a:0},
{q:"Entropy increases in?",o:["Spontaneous reaction","Non-spontaneous","Closed system","Vacuum only"],a:0},
{q:"Electronegativity highest in?",o:["Fluorine","Oxygen","Chlorine","Nitrogen"],a:0},
{q:"Which is amphoteric?",o:["Al2O3","Na2O","CO2","K2O"],a:0},

{q:"Unit of molarity?",o:["mol/L","mol/kg","kg/mol","g/mol"],a:0},
{q:"Which is Lewis acid?",o:["BF3","NH3","H2O","NaCl"],a:0},
{q:"Which is Lewis base?",o:["NH3","BF3","CO2","HCl"],a:0},
{q:"Transition metals show?",o:["Variable oxidation states","Fixed valency","No color","No bonding"],a:0},
{q:"Which is aromatic compound?",o:["Benzene","Ethane","Methane","Propane"],a:0},

{q:"Which law relates pressure & temperature?",o:["Gay-Lussac’s Law","Boyle’s Law","Charles Law","Avogadro Law"],a:0},
{q:"Which is reducing agent?",o:["Electron donor","Electron acceptor","Acid","Base"],a:0},
{q:"Enthalpy symbol?",o:["H","E","U","G"],a:0},
{q:"Which is strong base?",o:["NaOH","NH3","HCl","H2SO4"],a:0},
{q:"Which is buffer solution?",o:["Weak acid + salt","Strong acid","Strong base","Water"],a:0},

{q:"Which metal is most reactive?",o:["Potassium","Iron","Copper","Gold"],a:0},
{q:"Ionization energy increases across?",o:["Period","Group","Down group","Random"],a:0},
{q:"Which element has highest electronegativity?",o:["Fluorine","Oxygen","Nitrogen","Carbon"],a:0},
{q:"Which is exothermic reaction?",o:["Heat released","Heat absorbed","No heat","Cold reaction"],a:0},
{q:"Which is endothermic reaction?",o:["Heat absorbed","Heat released","No heat","Fusion only"],a:0},

{q:"Which type of bond in NaCl?",o:["Ionic","Covalent","Metallic","Hydrogen"],a:0},
{q:"Which compound forms hydrogen bond?",o:["H2O","CO2","CH4","NaCl"],a:0},
{q:"Which is allotrope of carbon?",o:["Diamond","Water","Salt","Sulfur"],a:0},
{q:"Which is oxidizing agent?",o:["Electron acceptor","Electron donor","Base","Salt"],a:0},
{q:"Which is rate determining step?",o:["Slowest step","Fastest step","First step","Last step"],a:0},

{q:"Which gas causes acid rain?",o:["SO2","O2","N2","H2"],a:0},
{q:"Which is coordination compound?",o:["[Cu(NH3)4]2+","NaCl","H2O","CO2"],a:0},
{q:"Which element has maximum atomic size?",o:["Francium","Hydrogen","Helium","Fluorine"],a:0},
{q:"Which acid is diprotic?",o:["H2SO4","HCl","HNO3","HBr"],a:0},
{q:"Which is non-metal?",o:["Sulfur","Iron","Copper","Zinc"],a:0},

{q:"Which law relates rate & concentration?",o:["Rate law","Boyle’s law","Ohm’s law","Newton’s law"],a:0},
{q:"Which is sp2 hybridized?",o:["Ethene","Methane","Ethyne","Propane"],a:0},
{q:"Which is sp hybridized?",o:["Ethyne","Methane","Ethane","Benzene"],a:0},
{q:"Which is strong electrolyte?",o:["NaCl","Sugar","Urea","Glucose"],a:0},
{q:"Which gas used in Haber process?",o:["Nitrogen","Oxygen","Hydrogen only","Carbon dioxide"],a:0},

{q:"Which metal extracted by electrolysis?",o:["Aluminium","Iron","Copper","Zinc"],a:0},
{q:"Which acid present in vinegar?",o:["Acetic acid","Citric acid","Formic acid","Sulfuric acid"],a:0},
{q:"Which compound shows resonance?",o:["Benzene","Methane","Ethane","Propane"],a:0},
{q:"Which principle explains equilibrium shift?",o:["Le Chatelier’s principle","Ohm’s law","Newton’s law","Boyle’s law"],a:0},
{q:"Which element is halogen?",o:["Chlorine","Oxygen","Nitrogen","Carbon"],a:0}

],

Biology:[

{q:"DNA replication is semi-conservative because?",o:["Each strand acts as template","DNA fully new","DNA destroyed","RNA replaces DNA"],a:0},
{q:"Which enzyme synthesizes DNA?",o:["DNA polymerase","RNA polymerase","Ligase","Helicase"],a:0},
{q:"Which organelle contains its own DNA?",o:["Mitochondria","Ribosome","Golgi","Lysosome"],a:0},
{q:"Which phase has DNA replication?",o:["S phase","G1","G2","M phase"],a:0},
{q:"Codon consists of how many bases?",o:["3","2","4","5"],a:0},

{q:"Which molecule carries amino acids?",o:["tRNA","mRNA","rRNA","DNA"],a:0},
{q:"Human chromosome number?",o:["46","23","44","48"],a:0},
{q:"Crossing over occurs in?",o:["Prophase I","Metaphase","Anaphase","Telophase"],a:0},
{q:"Hardy-Weinberg principle relates to?",o:["Genetic equilibrium","Mutation","Selection","Drift"],a:0},
{q:"Which blood group is universal donor?",o:["O negative","AB positive","A","B"],a:0},

{q:"Insulin secreted by?",o:["Pancreas","Liver","Kidney","Heart"],a:0},
{q:"Photosynthesis occurs in?",o:["Chloroplast","Mitochondria","Nucleus","Ribosome"],a:0},
{q:"Light reaction occurs in?",o:["Thylakoid","Stroma","Cytoplasm","Nucleus"],a:0},
{q:"Calvin cycle occurs in?",o:["Stroma","Thylakoid","Matrix","Cytosol"],a:0},
{q:"Which pigment absorbs maximum light?",o:["Chlorophyll-a","Carotene","Xanthophyll","Anthocyanin"],a:0},

{q:"Which hormone regulates metabolism?",o:["Thyroxine","Insulin","Adrenaline","Cortisol"],a:0},
{q:"Which vitamin synthesized in skin?",o:["Vitamin D","Vitamin C","Vitamin A","Vitamin B12"],a:0},
{q:"Which is largest human gland?",o:["Liver","Pancreas","Thyroid","Spleen"],a:0},
{q:"Which structure controls cell activities?",o:["Nucleus","Ribosome","Golgi","ER"],a:0},
{q:"Which is not RNA type?",o:["dRNA","mRNA","tRNA","rRNA"],a:0},

{q:"Mutation means?",o:["DNA change","Protein folding","Cell division","Growth"],a:0},
{q:"Which base pairs with Adenine in DNA?",o:["Thymine","Uracil","Cytosine","Guanine"],a:0},
{q:"Uracil present in?",o:["RNA","DNA","Protein","Lipid"],a:0},
{q:"Which organ filters blood?",o:["Kidney","Heart","Lung","Liver"],a:0},
{q:"Which system transports oxygen?",o:["Circulatory","Digestive","Nervous","Endocrine"],a:0},

{q:"Which enzyme breaks hydrogen peroxide?",o:["Catalase","Amylase","Protease","Lipase"],a:0},
{q:"Which is connective tissue?",o:["Blood","Muscle","Neuron","Epithelium"],a:0},
{q:"Which process forms ATP?",o:["Cellular respiration","Photosynthesis only","Digestion","Diffusion"],a:0},
{q:"Which organelle synthesizes protein?",o:["Ribosome","Golgi","Mitochondria","Lysosome"],a:0},
{q:"Which cell division for growth?",o:["Mitosis","Meiosis","Binary fission","Budding"],a:0},

{q:"Which is dominant allele symbol?",o:["Capital letter","Small letter","Number","Symbol"],a:0},
{q:"Which organism used in recombinant DNA tech?",o:["E. coli","Virus","Fungi","Plant"],a:0},
{q:"Which is natural selection factor?",o:["Survival of fittest","Mutation only","Random","Static"],a:0},
{q:"Which theory proposed by Darwin?",o:["Evolution","Cell theory","Gene theory","Atomic theory"],a:0},
{q:"Which molecule stores genetic info?",o:["DNA","RNA","Protein","Carbohydrate"],a:0},

{q:"Which organ controls reflex action?",o:["Spinal cord","Brain","Heart","Liver"],a:0},
{q:"Which part of neuron transmits signal?",o:["Axon","Dendrite","Soma","Nucleus"],a:0},
{q:"Which structure in plant controls gas exchange?",o:["Stomata","Xylem","Phloem","Root"],a:0},
{q:"Which is C4 plant example?",o:["Maize","Rice","Wheat","Potato"],a:0},
{q:"Which is monocot?",o:["Maize","Rose","Sunflower","Pea"],a:0},

{q:"Which immune cell produces antibodies?",o:["B-lymphocyte","T-cell","RBC","Platelet"],a:0},
{q:"Which is RNA virus?",o:["HIV","E. coli","Yeast","Malaria parasite"],a:0},
{q:"Which organ produces bile?",o:["Liver","Pancreas","Stomach","Kidney"],a:0},
{q:"Which nutrient builds muscle?",o:["Protein","Carbohydrate","Fat","Vitamin"],a:0},
{q:"Which part of brain controls balance?",o:["Cerebellum","Cerebrum","Medulla","Thalamus"],a:0},

{q:"Which process forms gametes?",o:["Meiosis","Mitosis","Binary fission","Fusion"],a:0},
{q:"Which gas released in photosynthesis?",o:["Oxygen","CO2","Nitrogen","Methane"],a:0},
{q:"Which is parasitic organism?",o:["Tapeworm","Dog","Cat","Human"],a:0},
{q:"Which blood component clots?",o:["Platelets","RBC","WBC","Plasma"],a:0},
{q:"Which hormone triggers fight or flight?",o:["Adrenaline","Insulin","Estrogen","Progesterone"],a:0}

],


Movies:[

{q:"Which film won first Academy Award for Best Picture?",o:["Wings","Casablanca","Titanic","Ben-Hur"],a:0},
{q:"Which director is known for nonlinear storytelling in 'Pulp Fiction'?",o:["Quentin Tarantino","Christopher Nolan","Scorsese","Spielberg"],a:0},
{q:"Italian Neorealism emerged after?",o:["World War II","World War I","Cold War","French Revolution"],a:0},
{q:"Which film pioneered synchronized sound?",o:["The Jazz Singer","Citizen Kane","Metropolis","Psycho"],a:0},
{q:"Which award is highest in Indian cinema?",o:["Dadasaheb Phalke Award","Filmfare","National Award","IIFA"],a:0},

{q:"Which movement influenced French New Wave?",o:["Italian Neorealism","German Expressionism","Hollywood Classicism","Bollywood"],a:0},
{q:"Cinematography focuses on?",o:["Visual composition","Sound","Script","Editing only"],a:0},
{q:"Montage theory associated with?",o:["Sergei Eisenstein","Hitchcock","Kubrick","Nolan"],a:0},
{q:"Which film directed by Christopher Nolan explores time dilation?",o:["Interstellar","Inception","Tenet","Memento"],a:0},
{q:"Which film won most Oscars (11 awards)?",o:["Ben-Hur","Titanic","Return of the King","All of these"],a:3},

{q:"Method acting popularized by?",o:["Marlon Brando","Tom Cruise","Brad Pitt","Leonardo DiCaprio"],a:0},
{q:"Film noir characterized by?",o:["Dark lighting","Comedy","Romance","Fantasy"],a:0},
{q:"Which Indian film nominated for Oscar?",o:["Lagaan","Dangal","PK","RRR"],a:0},
{q:"IMDb primarily provides?",o:["Film database","Streaming","Awards","Production"],a:0},
{q:"Which genre emphasizes futuristic science?",o:["Sci-Fi","Drama","Noir","Western"],a:0},

{q:"Parallel cinema in India focuses on?",o:["Realism","Fantasy","Comedy","Action"],a:0},
{q:"Which director made 'Schindler’s List'?",o:["Steven Spielberg","James Cameron","Ridley Scott","Kubrick"],a:0},
{q:"Which film introduced bullet time effect?",o:["The Matrix","Avatar","Inception","Gladiator"],a:0},
{q:"Which country hosts Cannes Film Festival?",o:["France","Italy","USA","Germany"],a:0},
{q:"Which actor won Oscar for 'The Revenant'?",o:["Leonardo DiCaprio","Tom Hanks","Brad Pitt","Christian Bale"],a:0},

{q:"Which is highest grossing film worldwide?",o:["Avatar","Titanic","Avengers Endgame","Star Wars"],a:0},
{q:"Which film is based on multiverse concept?",o:["Everything Everywhere All At Once","Titanic","Joker","Gladiator"],a:0},
{q:"Which editing technique creates tension?",o:["Cross-cutting","Fade out","Zoom","Static frame"],a:0},
{q:"Which is Bollywood’s largest studio?",o:["YRF","Marvel","Warner Bros","Pixar"],a:0},
{q:"Which film popularized CGI dinosaurs?",o:["Jurassic Park","King Kong","Avatar","Titanic"],a:0},

{q:"Which award ceremony held annually in USA?",o:["Oscars","BAFTA","Filmfare","Cannes"],a:0},
{q:"Which film explores dreams within dreams?",o:["Inception","Tenet","Memento","Interstellar"],a:0},
{q:"Auteur theory emphasizes?",o:["Director as creator","Actor","Producer","Studio"],a:0},
{q:"Which movie directed by James Cameron?",o:["Avatar","Gladiator","Dune","Joker"],a:0},
{q:"Which technique uses long continuous shot?",o:["Long take","Cutaway","Jump cut","Flashback"],a:0},

{q:"Which film won Best Picture in 2020 Oscars?",o:["Parasite","1917","Joker","Ford v Ferrari"],a:0},
{q:"Which is silent era legend?",o:["Charlie Chaplin","Tom Hanks","DiCaprio","Brad Pitt"],a:0},
{q:"Which film used motion capture heavily?",o:["Avatar","Titanic","Jaws","Rocky"],a:0},
{q:"Which film directed by Martin Scorsese?",o:["The Wolf of Wall Street","Titanic","Avatar","Inception"],a:0},
{q:"Which genre includes Westerns?",o:["Cowboy films","Sci-fi","Romance","Fantasy"],a:0},

{q:"Which film uses non-linear reverse storytelling?",o:["Memento","Inception","Tenet","Dune"],a:0},
{q:"Which is Pixar animated film?",o:["Toy Story","Frozen","Lion King","Shrek"],a:0},
{q:"Which country produces Nollywood films?",o:["Nigeria","India","USA","China"],a:0},
{q:"Which award presented by British Academy?",o:["BAFTA","Oscar","Golden Globe","Emmy"],a:0},
{q:"Which movie based on real Titanic disaster?",o:["Titanic","Poseidon","Jaws","Pearl Harbor"],a:0},

{q:"Which technique manipulates depth of field?",o:["Focus","Zoom","Cut","Fade"],a:0},
{q:"Which film features character Joker played by Joaquin Phoenix?",o:["Joker","Batman Begins","Dark Knight","Suicide Squad"],a:0},
{q:"Which streaming platform produces original films?",o:["Netflix","DVD","Cable only","Radio"],a:0},
{q:"Which director known for suspense thrillers?",o:["Alfred Hitchcock","Spielberg","Kubrick","Cameron"],a:0},
{q:"Which genre involves post-apocalyptic theme?",o:["Dystopian","Romance","Comedy","Noir"],a:0},

{q:"Which is highest award at Cannes?",o:["Palme d'Or","Oscar","Golden Lion","Golden Bear"],a:0},
{q:"Which film explores space survival?",o:["Gravity","Titanic","Joker","Avatar"],a:0},
{q:"Which actor known for method acting intense roles?",o:["Christian Bale","Tom Cruise","Will Smith","Chris Evans"],a:0},
{q:"Which is Indian Oscar winner for music?",o:["A.R. Rahman","Shankar","Anu Malik","Pritam"],a:0},
{q:"Which format supports 3D cinema?",o:["IMAX","MP3","TXT","AVI"],a:0}

],


Music:[

{q:"How many semitones are there in an octave (Western music)?",o:["12","8","7","10"],a:0},
{q:"Major scale pattern is?",o:["W-W-H-W-W-W-H","H-W-W-H-W-W-W","W-H-W-W-H-W-W","W-W-W-H-W-H-W"],a:0},
{q:"Relative minor of C major?",o:["A minor","E minor","D minor","G minor"],a:0},
{q:"Which interval is 7 semitones?",o:["Perfect fifth","Major third","Minor third","Perfect fourth"],a:0},
{q:"Tempo marking 'Allegro' means?",o:["Fast","Slow","Very slow","Moderate"],a:0},

{q:"Which clef is used for bass range?",o:["Bass clef","Treble clef","Alto clef","Tenor clef"],a:0},
{q:"Chord consisting of root, major third & perfect fifth?",o:["Major triad","Minor triad","Diminished","Augmented"],a:0},
{q:"Raga in Indian classical based on?",o:["Specific scale & mood","Random notes","Only rhythm","Harmony"],a:0},
{q:"Tala in Indian music refers to?",o:["Rhythm cycle","Scale","Melody","Harmony"],a:0},
{q:"Composer of Symphony No. 5?",o:["Beethoven","Mozart","Bach","Chopin"],a:0},

{q:"Which mode starts on second degree?",o:["Dorian","Ionian","Phrygian","Lydian"],a:0},
{q:"Which interval is dissonant?",o:["Tritone","Perfect fifth","Octave","Major third"],a:0},
{q:"Harmony refers to?",o:["Combination of notes","Single melody","Rhythm","Tempo"],a:0},
{q:"Which instrument is aerophone?",o:["Flute","Drum","Violin","Piano"],a:0},
{q:"Which scale contains 5 notes?",o:["Pentatonic","Chromatic","Major","Minor"],a:0},

{q:"Time signature 4/4 means?",o:["4 beats per measure","4 notes only","4 seconds","4 chords"],a:0},
{q:"Which chord has lowered fifth?",o:["Diminished","Major","Minor","Augmented"],a:0},
{q:"Which raga associated with evening?",o:["Yaman","Bhairav","Todi","Bhairavi"],a:0},
{q:"Composer of 'The Four Seasons'?",o:["Vivaldi","Bach","Mozart","Handel"],a:0},
{q:"Which scale uses all 12 notes?",o:["Chromatic","Pentatonic","Major","Minor"],a:0},

{q:"Syncopation refers to?",o:["Accent off-beat","Fast tempo","Slow rhythm","Harmony"],a:0},
{q:"Which instrument uses double reed?",o:["Oboe","Flute","Trumpet","Violin"],a:0},
{q:"Counterpoint involves?",o:["Multiple melodies","Single melody","Rhythm only","Harmony only"],a:0},
{q:"Which composer was Baroque era?",o:["Bach","Beethoven","Debussy","Stravinsky"],a:0},
{q:"Which interval is 3 semitones?",o:["Minor third","Major third","Perfect fourth","Octave"],a:0},

{q:"Which term means gradually getting louder?",o:["Crescendo","Diminuendo","Allegro","Staccato"],a:0},
{q:"Which chord progression common in pop?",o:["I-V-vi-IV","ii-V-I","I-IV-I-V","V-IV-I"],a:0},
{q:"Which Indian classical system in South India?",o:["Carnatic","Hindustani","Western","Fusion"],a:0},
{q:"Which raga used in meditation?",o:["Bhairavi","Kafi","Durga","Yaman"],a:0},
{q:"Which instrument belongs to chordophone?",o:["Violin","Flute","Drum","Trumpet"],a:0},

{q:"Which tempo is slow and solemn?",o:["Adagio","Allegro","Presto","Vivace"],a:0},
{q:"Which musical era followed Classical?",o:["Romantic","Baroque","Medieval","Modern"],a:0},
{q:"Which note frequency standard (concert pitch)?",o:["A=440Hz","A=400Hz","C=440Hz","D=500Hz"],a:0},
{q:"Which composer deaf yet composed?",o:["Beethoven","Mozart","Chopin","Haydn"],a:0},
{q:"Which instrument is membranophone?",o:["Drum","Flute","Guitar","Piano"],a:0},

{q:"Which term means detached notes?",o:["Staccato","Legato","Forte","Piano"],a:0},
{q:"Which chord uses augmented fifth?",o:["Augmented","Major","Minor","Diminished"],a:0},
{q:"Which scale has raised 4th?",o:["Lydian","Dorian","Mixolydian","Aeolian"],a:0},
{q:"Which composer wrote 'Moonlight Sonata'?",o:["Beethoven","Mozart","Bach","Schubert"],a:0},
{q:"Which is polyphonic texture?",o:["Multiple voices","Single melody","Rhythm only","Harmony only"],a:0},

{q:"Which tala in Hindustani is 16 beats?",o:["Teentaal","Ektaal","Jhaptal","Rupak"],a:0},
{q:"Which instrument is idiophone?",o:["Xylophone","Violin","Flute","Trumpet"],a:0},
{q:"Which interval is octave?",o:["12 semitones","7 semitones","5 semitones","3 semitones"],a:0},
{q:"Which composer known for symphonies?",o:["Beethoven","Elvis","Adele","Drake"],a:0},
{q:"Which term means soft?",o:["Piano","Forte","Crescendo","Allegro"],a:0},

{q:"Which mode is natural minor?",o:["Aeolian","Ionian","Dorian","Lydian"],a:0},
{q:"Which form alternates solo and orchestra?",o:["Concerto","Sonata","Opera","Symphony"],a:0},
{q:"Which instrument common in jazz?",o:["Saxophone","Sitar","Veena","Tabla"],a:0},
{q:"Which scale used in blues?",o:["Blues scale","Major scale","Minor scale","Chromatic"],a:0},
{q:"Which era includes Mozart?",o:["Classical","Baroque","Romantic","Modern"],a:0}

],


Business:[

{q:"GDP measures?",o:["Total output","Inflation","Exports only","Government revenue"],a:0},
{q:"Inflation reduces?",o:["Purchasing power","Income","Exports","Population"],a:0},
{q:"Monetary policy is controlled by?",o:["Central Bank","Government","Stock market","IMF"],a:0},
{q:"Fiscal policy involves?",o:["Tax & spending","Interest rate","Imports","Currency printing"],a:0},
{q:"Law of demand states?",o:["Price ↑ demand ↓","Price ↑ demand ↑","No relation","Random"],a:0},

{q:"Opportunity cost means?",o:["Next best alternative","Free good","Profit","Loss"],a:0},
{q:"Perfect competition means?",o:["Many buyers & sellers","Single seller","Government control","Cartel"],a:0},
{q:"Monopoly has?",o:["Single seller","Many sellers","Free market","No control"],a:0},
{q:"Elastic demand means?",o:["Sensitive to price","Not sensitive","Fixed","Constant"],a:0},
{q:"Which is indirect tax?",o:["GST","Income tax","Corporate tax","Property tax"],a:0},

{q:"Stock market crash 1929 led to?",o:["Great Depression","WWII","Cold War","Industrial boom"],a:0},
{q:"Which index represents US market?",o:["Dow Jones","Nifty","FTSE","Nikkei"],a:0},
{q:"Repo rate affects?",o:["Loan interest","Exports","Imports","Trade balance"],a:0},
{q:"Capitalism promotes?",o:["Private ownership","State ownership","No profit","Socialism"],a:0},
{q:"PPP stands for?",o:["Purchasing Power Parity","Public Private Policy","Price Production Plan","Profit Price Parity"],a:0},

{q:"Which organization regulates global trade?",o:["WTO","IMF","World Bank","UNESCO"],a:0},
{q:"Inflation measured by?",o:["CPI","GDP","FDI","PPP"],a:0},
{q:"Which is capital expenditure?",o:["Buying machinery","Salary","Rent","Utilities"],a:0},
{q:"Balance of trade includes?",o:["Exports - Imports","GDP","Taxes","FDI"],a:0},
{q:"Foreign Direct Investment means?",o:["Investment from abroad","Export","Import","Loan"],a:0},

{q:"Which market deals in short-term funds?",o:["Money market","Capital market","Stock market","Forex"],a:0},
{q:"Which is financial asset?",o:["Bond","Land","Building","Machinery"],a:0},
{q:"Diversification reduces?",o:["Risk","Profit","Cost","Tax"],a:0},
{q:"Depreciation means?",o:["Value decrease","Value increase","Profit","Loss"],a:0},
{q:"Which is leading economic indicator?",o:["Stock index","Unemployment","Inflation","GDP"],a:0},

{q:"Marginal cost is?",o:["Cost of one extra unit","Total cost","Fixed cost","Variable cost"],a:0},
{q:"Break-even point occurs when?",o:["Revenue = Cost","Profit maximum","Loss","Tax zero"],a:0},
{q:"Which is fixed cost?",o:["Rent","Raw material","Commission","Transport"],a:0},
{q:"Which is variable cost?",o:["Raw material","Rent","Insurance","License"],a:0},
{q:"Supply curve slopes?",o:["Upward","Downward","Horizontal","Vertical"],a:0},

{q:"Which currency is global reserve currency?",o:["US Dollar","Euro","Yen","Rupee"],a:0},
{q:"Which is not central bank?",o:["SBI","RBI","Federal Reserve","ECB"],a:0},
{q:"Which is merger type?",o:["Horizontal","Linear","Flat","Open"],a:0},
{q:"IPO stands for?",o:["Initial Public Offering","International Public Option","Internal Policy Offer","None"],a:0},
{q:"Inflation caused by excess demand is?",o:["Demand-pull","Cost-push","Stagflation","Deflation"],a:0},

{q:"Cost-push inflation caused by?",o:["Rising production cost","High demand","High exports","Low tax"],a:0},
{q:"Which is derivative instrument?",o:["Futures","Share","Bond","Cash"],a:0},
{q:"Which ratio measures liquidity?",o:["Current ratio","Debt ratio","Profit margin","ROE"],a:0},
{q:"Return on equity measures?",o:["Profitability","Liquidity","Debt","Tax"],a:0},
{q:"Which economic system mixes public & private?",o:["Mixed economy","Capitalism","Socialism","Feudalism"],a:0},

{q:"Which institution provides development loans?",o:["World Bank","WTO","IMF","OECD"],a:0},
{q:"Hyperinflation means?",o:["Extremely high inflation","Low inflation","Stable price","Deflation"],a:0},
{q:"Which tax is progressive?",o:["Income tax","GST","VAT","Custom duty"],a:0},
{q:"Which sector includes IT services?",o:["Tertiary","Primary","Secondary","Quaternary"],a:0},
{q:"Which is example of primary sector?",o:["Agriculture","Manufacturing","Banking","IT"],a:0},

{q:"Which is example of secondary sector?",o:["Manufacturing","Agriculture","Banking","Education"],a:0},
{q:"Which organization stabilizes currency?",o:["IMF","WTO","UN","OECD"],a:0},
{q:"Which is free market feature?",o:["Minimal government","High tax","State control","Price fixing"],a:0},
{q:"Which country has largest GDP?",o:["USA","China","Japan","Germany"],a:0},
{q:"Economic growth measured by?",o:["Increase in GDP","Inflation","Unemployment","Tax"],a:0}

],

Biology:[

{q:"DNA replication is semi-conservative because?",o:["Each strand acts as template","DNA fully new","DNA destroyed","RNA replaces DNA"],a:0},
{q:"Which enzyme synthesizes DNA?",o:["DNA polymerase","RNA polymerase","Ligase","Helicase"],a:0},
{q:"Which organelle contains its own DNA?",o:["Mitochondria","Ribosome","Golgi","Lysosome"],a:0},
{q:"Which phase has DNA replication?",o:["S phase","G1","G2","M phase"],a:0},
{q:"Codon consists of how many bases?",o:["3","2","4","5"],a:0},

{q:"Which molecule carries amino acids?",o:["tRNA","mRNA","rRNA","DNA"],a:0},
{q:"Human chromosome number?",o:["46","23","44","48"],a:0},
{q:"Crossing over occurs in?",o:["Prophase I","Metaphase","Anaphase","Telophase"],a:0},
{q:"Hardy-Weinberg principle relates to?",o:["Genetic equilibrium","Mutation","Selection","Drift"],a:0},
{q:"Which blood group is universal donor?",o:["O negative","AB positive","A","B"],a:0},

{q:"Insulin secreted by?",o:["Pancreas","Liver","Kidney","Heart"],a:0},
{q:"Photosynthesis occurs in?",o:["Chloroplast","Mitochondria","Nucleus","Ribosome"],a:0},
{q:"Light reaction occurs in?",o:["Thylakoid","Stroma","Cytoplasm","Nucleus"],a:0},
{q:"Calvin cycle occurs in?",o:["Stroma","Thylakoid","Matrix","Cytosol"],a:0},
{q:"Which pigment absorbs maximum light?",o:["Chlorophyll-a","Carotene","Xanthophyll","Anthocyanin"],a:0},

{q:"Which hormone regulates metabolism?",o:["Thyroxine","Insulin","Adrenaline","Cortisol"],a:0},
{q:"Which vitamin synthesized in skin?",o:["Vitamin D","Vitamin C","Vitamin A","Vitamin B12"],a:0},
{q:"Which is largest human gland?",o:["Liver","Pancreas","Thyroid","Spleen"],a:0},
{q:"Which structure controls cell activities?",o:["Nucleus","Ribosome","Golgi","ER"],a:0},
{q:"Which is not RNA type?",o:["dRNA","mRNA","tRNA","rRNA"],a:0},

{q:"Mutation means?",o:["DNA change","Protein folding","Cell division","Growth"],a:0},
{q:"Which base pairs with Adenine in DNA?",o:["Thymine","Uracil","Cytosine","Guanine"],a:0},
{q:"Uracil present in?",o:["RNA","DNA","Protein","Lipid"],a:0},
{q:"Which organ filters blood?",o:["Kidney","Heart","Lung","Liver"],a:0},
{q:"Which system transports oxygen?",o:["Circulatory","Digestive","Nervous","Endocrine"],a:0},

{q:"Which enzyme breaks hydrogen peroxide?",o:["Catalase","Amylase","Protease","Lipase"],a:0},
{q:"Which is connective tissue?",o:["Blood","Muscle","Neuron","Epithelium"],a:0},
{q:"Which process forms ATP?",o:["Cellular respiration","Photosynthesis only","Digestion","Diffusion"],a:0},
{q:"Which organelle synthesizes protein?",o:["Ribosome","Golgi","Mitochondria","Lysosome"],a:0},
{q:"Which cell division for growth?",o:["Mitosis","Meiosis","Binary fission","Budding"],a:0},

{q:"Which is dominant allele symbol?",o:["Capital letter","Small letter","Number","Symbol"],a:0},
{q:"Which organism used in recombinant DNA tech?",o:["E. coli","Virus","Fungi","Plant"],a:0},
{q:"Which is natural selection factor?",o:["Survival of fittest","Mutation only","Random","Static"],a:0},
{q:"Which theory proposed by Darwin?",o:["Evolution","Cell theory","Gene theory","Atomic theory"],a:0},
{q:"Which molecule stores genetic info?",o:["DNA","RNA","Protein","Carbohydrate"],a:0},

{q:"Which organ controls reflex action?",o:["Spinal cord","Brain","Heart","Liver"],a:0},
{q:"Which part of neuron transmits signal?",o:["Axon","Dendrite","Soma","Nucleus"],a:0},
{q:"Which structure in plant controls gas exchange?",o:["Stomata","Xylem","Phloem","Root"],a:0},
{q:"Which is C4 plant example?",o:["Maize","Rice","Wheat","Potato"],a:0},
{q:"Which is monocot?",o:["Maize","Rose","Sunflower","Pea"],a:0},

{q:"Which immune cell produces antibodies?",o:["B-lymphocyte","T-cell","RBC","Platelet"],a:0},
{q:"Which is RNA virus?",o:["HIV","E. coli","Yeast","Malaria parasite"],a:0},
{q:"Which organ produces bile?",o:["Liver","Pancreas","Stomach","Kidney"],a:0},
{q:"Which nutrient builds muscle?",o:["Protein","Carbohydrate","Fat","Vitamin"],a:0},
{q:"Which part of brain controls balance?",o:["Cerebellum","Cerebrum","Medulla","Thalamus"],a:0},

{q:"Which process forms gametes?",o:["Meiosis","Mitosis","Binary fission","Fusion"],a:0},
{q:"Which gas released in photosynthesis?",o:["Oxygen","CO2","Nitrogen","Methane"],a:0},
{q:"Which is parasitic organism?",o:["Tapeworm","Dog","Cat","Human"],a:0},
{q:"Which blood component clots?",o:["Platelets","RBC","WBC","Plasma"],a:0},
{q:"Which hormone triggers fight or flight?",o:["Adrenaline","Insulin","Estrogen","Progesterone"],a:0}

],


};

/* ================= INIT CATEGORIES ================= */

function initCategories() {
    let select = document.getElementById("categorySelect");
    let grid = document.getElementById("categoryGrid");

    select.innerHTML = "";
    grid.innerHTML = "";

    Object.keys(questionBank).forEach(cat => {

        let opt = document.createElement("option");
        opt.value = cat;
        opt.textContent = cat;
        select.appendChild(opt);

        let div = document.createElement("div");
        div.textContent = cat;
        grid.appendChild(div);
    });
}

/* ================= QUIZ SETUP ================= */

function openQuizSetup() {
    document.getElementById("quizSetup").classList.toggle("hidden");
}

/* ================= QUIZ LOGIC ================= */

let currentQuestions = [];
let currentIndex = 0;
let score = 0;
let timerInterval;
let time = 15;

function startQuiz() {

    let cat = document.getElementById("categorySelect").value;
    let count = parseInt(document.getElementById("questionCountSelect").value);

    let availableQuestions = questionBank[cat];

    if (count > availableQuestions.length) {
        alert("Not enough questions in this category yet!");
        return;
    }

    // Shuffle properly
    let shuffled = [...availableQuestions].sort(() => 0.5 - Math.random());

    currentQuestions = shuffled.slice(0, count);

    currentIndex = 0;
    score = 0;

    mainApp.classList.add("hidden");
    quizSection.classList.remove("hidden");

    showQuestion();
}

function showQuestion() {

    if (currentIndex >= currentQuestions.length) {
        endQuiz();
        return;
    }

    let q = currentQuestions[currentIndex];
    questionTitle.innerText = q.q;

    options.innerHTML = "";

    q.o.forEach((opt, i) => {
        let div = document.createElement("div");
        div.className = "option";
        div.innerText = opt;
        div.onclick = () => checkAnswer(i);
        options.appendChild(div);
    });

    time = 15;
    timeLeft.innerText = time;

    timerInterval = setInterval(() => {
        time--;
        timeLeft.innerText = time;

        if (time <= 0) {
            clearInterval(timerInterval);
            currentIndex++;
            showQuestion();
        }
    }, 1000);
}

function checkAnswer(i) {

    clearInterval(timerInterval);

    let correct = currentQuestions[currentIndex].a;
    let all = document.querySelectorAll(".option");

    all.forEach((el, index) => {
        if (index === correct) el.classList.add("correct");
        else if (index === i) el.classList.add("wrong");
    });

    if (i === correct) score++;

    setTimeout(() => {
        currentIndex++;
        showQuestion();
    }, 1000);
}

function endQuiz() {

    quizSection.classList.add("hidden");
    resultSection.classList.remove("hidden");

    let percent = Math.round((score / currentQuestions.length) * 100);

    if (percent >= 80)
        resultHeading.innerText = "Outstanding Performance! 🏆";
    else if (percent >= 50)
        resultHeading.innerText = "Good Job! 👍";
    else
        resultHeading.innerText = "Keep Practicing! 💪";

    resultText.innerText = `You scored ${score}/${currentQuestions.length} (${percent}%)`;

    saveHistory(score, percent);
}

/* ================= HISTORY ================= */

function saveHistory(score, percent) {

    let users = JSON.parse(localStorage.getItem("users"));
    let user = users.find(x => x.u === currentUser.u);

    user.history.push({ score, percent });

    localStorage.setItem("users", JSON.stringify(users));

    currentUser = user;
    updateLeaderboard();

}

function loadHistory() {

    historyList.innerHTML = "";

    currentUser.history.forEach(h => {
        historyList.innerHTML += `
        <div class="history-item">
            Score: ${h.score} (${h.percent}%)
            <div class="progress-bar">
                <div class="progress" style="width:${h.percent}%"></div>
            </div>
        </div>`;
    });
}

function updateStats() {

    let total = currentUser.history.length;

    let avg = total
        ? Math.round(currentUser.history.reduce((a, b) => a + b.percent, 0) / total)
        : 0;

    totalQuiz.innerText = total;
    avgScore.innerText = avg + "%";
}

function goHome() {

    resultSection.classList.add("hidden");
    mainApp.classList.remove("hidden");

    loadHistory();
    updateStats();
}

function updateLeaderboard() {

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let ranked = users.map(user => {

        let total = user.history.length;

        let avg = total
            ? Math.round(user.history.reduce((a, b) => a + b.percent, 0) / total)
            : 0;

        return {
            name: user.u,
            average: avg
        };

    });

    ranked.sort((a, b) => b.average - a.average);

    let leaderboardList = document.getElementById("leaderboardList");
    leaderboardList.innerHTML = "";

    ranked.slice(0,5).forEach((player, index) => {

        leaderboardList.innerHTML += `
        <div class="leaderboard-item">
            <div class="rank">#${index + 1}</div>
            <div class="leader-name">${player.name}</div>
            <div class="leader-score">${player.average}%</div>
        </div>
        `;
    });
}
