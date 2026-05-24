const { Item } = require('../models/items');
const { Claim } = require('../models/claims');

const items = [
  {
    _id: "6a0e27c05813e1c28496cad8",
    title: "Black Leather Wallet",
    location: "Main Cafeteria",
    description: "Found near the window seating. Contains a student ID and some cash.",
    questions: [
      "What is the name printed on the ID?",
      "Approximately how much cash was inside?",
      "Does it have any specific brand logo?"
    ],
    image: "https://i0.wp.com/denvergripco.com/wp-content/uploads/woocommerce-placeholder.png",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  },
  {
    _id: "6a0e27c05813e1c28496cad9",
    title: "Silver Laptop Charger",
    location: "Central Library",
    description: "65W USB-C charger left plugged into the wall outlet.",
    questions: [
      "What is the brand of the charger?",
      "Does the cable have any distinguishing marks or tape?",
      "Was it bundled with a velcro strap?"
    ],
    image: "https://i0.wp.com/denvergripco.com/wp-content/uploads/woocommerce-placeholder.png",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  },
  {
    _id: "6a0e27c05813e1c28496cada",
    title: "Blue Hydro Flask",
    location: "CS (New Block)",
    description: "32oz water bottle with a small dent at the bottom and a straw lid.",
    questions: [
      "Are there any stickers on the bottle?",
      "What color is the lid?",
      "Does it have a protective silicone boot at the base?"
    ],
    image: "https://i0.wp.com/denvergripco.com/wp-content/uploads/woocommerce-placeholder.png",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  },
  {
    _id: "6a0e27c05813e1c28496cadb",
    title: "Reddish-Brown Leather Wallet",
    location: "Campus Walkways / Corridors",
    description: "Found a worn, reddish-brown leather bifold wallet with visible stitching along the edges.",
    questions: [
      "What is the name on the ID card inside?",
      "Are there any specific bank or transit cards?",
      "Is there a brand logo embossed on the interior?"
    ],
    image: "https://res.cloudinary.com/dkenamkzd/image/upload/v1778343537/men_wallet_noek36.jpg",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  },
  {
    _id: "6a0e27c05813e1c28496cadc",
    title: "Vivo Smartphone",
    location: "Central Library",
    description: "Found a Vivo smartphone with a dark back, enclosed in a heavily yellowed clear protective case. It features a prominent dual-camera module.",
    questions: [
      "What is the lock screen wallpaper?",
      "Can you provide the lock screen passcode or pattern?",
      "Are there any visible cracks or scratches on the front display?"
    ],
    image: "https://res.cloudinary.com/dkenamkzd/image/upload/v1778343538/phone_2_ydpzek.jpg",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  },
  {
    _id: "6a0e27c05813e1c28496cadd",
    title: "Silver-Toned Ring with Stones",
    location: "Medical Center",
    description: "Found a silver-toned, multi-band ring with a wrap-around design, heavily accented with small clear stones.",
    questions: [
      "What is the approximate ring size?",
      "Are there any specific engravings or hallmarks on the inner band?",
      "Are any of the small stones missing?"
    ],
    image: "https://res.cloudinary.com/dkenamkzd/image/upload/v1778343537/ring_tqgjb1.jpg",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  },
  {
    _id: "6a0e27c05813e1c28496cade",
    title: "Dark Textured Pouch",
    location: "Main Cafeteria",
    description: "Found a small, dark brown pebbled-texture pouch or clutch with a top zipper.",
    questions: [
      "What is the brand name in metallic letters on the front?",
      "What color is the zipper hardware?",
      "Can you name at least two specific items currently inside the bag?"
    ],
    image: "https://res.cloudinary.com/dkenamkzd/image/upload/v1778343538/women_Bag_bt6hfa.jpg",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  },
  {
    _id: "6a0e27c05813e1c28496cadf",
    title: "Pink and White Women's Wallet",
    location: "Main Cafeteria",
    description: "Found a small, two-tone pink and white wallet with a distinct metal clasp on the front flap.",
    questions: [
      "What is the exact phrase printed on the front of the wallet?",
      "What specific shape is the metal clasp?",
      "Can you name the primary ID or any specific cards kept inside?"
    ],
    image: "https://res.cloudinary.com/dkenamkzd/image/upload/v1778343538/women_wallet_opcymu.jpg",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  },
  {
    _id: "6a0e27c05813e1c28496cae0",
    title: "Pakistan National Identity Card (CNIC)",
    location: "Admin Block (Reception)",
    description: "Found a smart Pakistan National Identity Card.",
    questions: [
      "What is the full name and father's name printed on the card?",
      "What is the date of birth listed?",
      "Can you provide the full 13-digit identity number?"
    ],
    image: "https://res.cloudinary.com/dkenamkzd/image/upload/v1778343537/national_id_card_zavtw5.jpg",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  },
  {
    _id: "6a0e27c05813e1c28496cae1",
    title: "Black USB-C Power Adapter",
    location: "General Computing Labs",
    description: "Found a black wall-wart style power adapter with a 2-prong plug and a USB-C connector. It has a cylindrical ferrite bead near the plug end.",
    questions: [
      "What is the brand name printed on the power brick?",
      "What is the output wattage (W) listed on the label?",
      "Are there any specific scratches or markings on the adapter?"
    ],
    image: "https://res.cloudinary.com/dkenamkzd/image/upload/v1778343537/laptop_charger_dp5rmm.jpg",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  },
  {
    _id: "6a0e27c05813e1c28496cae2",
    title: "Philips Silver USB Drive",
    location: "Software Engineering Lab",
    description: "Found a silver metallic Philips USB flash drive featuring a large circular keyring loop, resting inside clear plastic packaging.",
    questions: [
      "What is the exact storage capacity (e.g., 16GB, 64GB) printed on it?",
      "Can you name a specific file or folder currently saved on this drive?",
      "Are there any visible scratches or marks on the metal casing?"
    ],
    image: "https://res.cloudinary.com/dkenamkzd/image/upload/v1778343537/phillips_usb_ygpxvd.jpg",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  },
  {
    _id: "6a0e27c05813e1c28496cae3",
    title: "Keys with Braided Lanyard",
    location: "Campus Walkways / Corridors",
    description: "Found a set of two keys on a standard metal ring, attached to a distinct black and white braided cord lanyard. One key has a black plastic head.",
    questions: [
      "What specific word is embossed on the main key's black plastic head?",
      "What material does the braided black and white cord appear to be made of?",
      "Can you describe the shape or any markings on the second key?"
    ],
    image: "https://res.cloudinary.com/dkenamkzd/image/upload/v1778343537/keys_d3infp.jpg",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  },
  {
    _id: "6a0e27c05813e1c28496cae4",
    title: "Clear Frame Eyeglasses",
    location: "CS (New Block)",
    description: "Found a pair of rectangular eyeglasses with a clear transparent plastic front frame and dark arms.",
    questions: [
      "What color and texture are the side arms (temples) of the glasses?",
      "What specific text or model number is printed on the inside of the arm?",
      "Are these prescription lenses or blue-light blocking lenses?"
    ],
    image: "https://res.cloudinary.com/dkenamkzd/image/upload/v1778343537/eye_glasses_lmp2lc.jpg",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  },
  {
    _id: "6a0e27c05813e1c28496cae5",
    title: "White and Pink Football",
    location: "Student Service Center",
    description: "Found a stitched football featuring prominent white and bright pink panels with some graphic text.",
    questions: [
      "What specific text is printed near the edge of the pink panel?",
      "Is there a specific size number (like 4 or 5) printed on the ball?",
      "Does the ball have any custom initials or markings drawn with a marker?"
    ],
    image: "https://res.cloudinary.com/dkenamkzd/image/upload/v1778343536/football_mxyuou.jpg",
    claims: [],
    reporter: "6a0e27c05813e1c28496cad8"
  }
];

let loadata = async ()=>{
  await Claim.deleteMany();
  await Item.deleteMany()
  console.log("Deleted");
  Item.insertMany(items)
    .then(()=>{
      console.log("Sample Inserted Successfully");
    })
    .catch(()=>{
      cout("Error Occured while inserting Data");
    });
}
module.exports = { loadata };