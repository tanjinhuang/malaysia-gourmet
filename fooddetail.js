const params = new URLSearchParams(window.location.search);
const foodName = params.get("name");
const foodImg = params.get("img");

if (foodName && foodImg) {
    document.getElementById("food-name").textContent = foodName;
    document.getElementById("food-image").src = foodImg;
    document.getElementById("food-image").alt = foodName;

    // Food data database
    const foodData = {
        // ================= PERLIS =================
        "Pulut Panggang": {
            intro: "Pulut Panggang is a traditional Perlis snack featuring glutinous rice grilled in banana leaves, usually filled with spicy dried shrimp or coconut. It has a fragrant, slightly smoky flavor and a chewy texture.",
            ingredients: ["Glutinous rice","Coconut milk","Dried shrimp, finely chopped","Grated coconut (for filling)","Salt","Banana leaves for wrapping"],
            steps: ["Cook glutinous rice with coconut milk and a pinch of salt until partially cooked.","Prepare the filling by mixing grated coconut with dried shrimp and a little salt.",
                "Place a portion of rice on a banana leaf, add the filling in the center, and cover with more rice.","Wrap the banana leaf tightly around the rice and filling, securing with toothpicks or string.",
                "Grill over medium heat until the banana leaf is slightly charred and the rice is fully cooked, then serve."]
        },

        "Nasi Tumpang": {
            intro: "Nasi Tumpang is a layered rice dish from Perlis and Kelantan, wrapped in banana leaves. Traditionally made for travelers, it includes layers of rice, omelet, fish floss, and curry, forming a convenient and flavorful portable meal.",
            ingredients: ["Cooked rice","Thin omelet slices","Fish floss (serunding ikan)","Chicken curry or other curry","Banana leaves for wrapping"],
            steps: ["Prepare the cooked rice and all side dishes, including omelet slices, fish floss, and curry.",
                "Layer the ingredients in a banana leaf, starting with rice, then omelet, fish floss, more rice, and finally curry.",
                "Roll the banana leaf tightly into a cone shape to hold the layers together.","Optionally steam lightly to warm the contents before serving."]
        },

        // ================= KEDAH =================
        "Nasi Ulam": {
            intro: "Nasi Ulam is a traditional Kedah dish made from cooked rice mixed with an assortment of fresh herbs, vegetables, and grated coconut. It is aromatic, refreshing, and often enjoyed as a light meal or side dish.",
            ingredients: ["Cooked rice, cooled","Grated coconut, lightly toasted","Fresh herbs (daun kesum, daun kunyit, Vietnamese coriander)",
                "Chopped vegetables (cucumber, long beans, or bean sprouts)","Salted fish or dried shrimp, fried or toasted","Salt to taste"],
            steps: ["Cook rice and allow it to cool to room temperature.","Mix the rice with grated coconut and finely chopped fresh herbs.",
                "Add chopped vegetables and salted fish or dried shrimp for flavor.","Toss gently and serve as a refreshing dish."]
        },

        "Kuah Daging": {
            intro: "Kuah Daging is a rich Kedah beef curry made with coconut milk, aromatic spices, and herbs. The slow-cooked beef becomes tender, soaking up the flavorful sauce, making it perfect with rice or bread.",
            ingredients: ["Beef, cut into cubes","Coconut milk","Onions, chopped","Garlic cloves","Spices: coriander, cumin, cinnamon",
                "Chili paste","Oil for frying","Salt and sugar to taste"],
            steps: ["Blend onions, garlic, and spices into a smooth paste.","Heat oil in a pan and fry the paste until fragrant and slightly caramelized.",
                "Add beef cubes and cook until they are browned on all sides.","Pour in coconut milk and simmer gently until the beef is tender and the sauce thickens.",
                "Adjust seasoning with salt and sugar, then serve hot."]
        },

        // ================= KELANTAN =================
        "Nasi Kerabu": {
            intro: "Nasi Kerabu is a signature Kelantan dish featuring vibrant blue rice cooked with butterfly pea flowers, served with fresh herbs, salted egg, fried fish, and a side of budu (fermented fish sauce). It is aromatic, flavorful, and visually striking.",
            ingredients: ["Rice","Butterfly pea flowers (for blue coloring)","Fresh herbs (mint, daun kesum, Vietnamese coriander)",
                "Salted eggs, sliced","Fried fish (usually mackerel or sardine)","Budu sauce"],
            steps: ["Cook rice with butterfly pea flowers to give it a natural blue color.","Prepare and wash fresh herbs, and make the budu dipping sauce.",
                "Serve the blue rice with herbs, sliced salted egg, and fried fish on the side."]
        },

        "Ayam Percik": {
            intro: "Ayam Percik is a Kelantanese grilled chicken dish, marinated and basted with a rich, spicy coconut milk sauce. It is tender, flavorful, and often enjoyed at festive occasions or street food stalls.",
            ingredients: ["Whole chicken or chicken pieces","Coconut milk","Chili paste","Lemongrass, bruised","Tamarind juice","Salt and sugar to taste"],
            steps: ["Marinate the chicken with chili paste, lemongrass, tamarind juice, salt, and sugar.",
                "Grill the chicken over medium heat, basting frequently with the coconut milk sauce until fully cooked and slightly charred.",
                "Serve hot as a main dish."]
        },

        "Kuih Akok": {
            intro: "Kuih Akok is a traditional Kelantanese sweet cake made from eggs, coconut milk, and palm sugar. It has a soft, slightly caramelized texture and is often enjoyed as a snack or dessert.",
            ingredients: ["Eggs","Coconut milk","Palm sugar, melted","Flour (optional for texture)"],
            steps: ["Mix eggs, coconut milk, and melted palm sugar into a smooth batter, adding flour if desired.","Pour the batter into small molds or muffin tins.",
                "Bake in a preheated oven or steam until the tops are golden brown and set.","Serve warm or at room temperature."]
        },

        // ================= PENANG =================
        "Char Kway Teow": {
            intro: "Char Kway Teow is Penang’s iconic stir-fried flat noodle dish, featuring prawns, cockles, eggs, and bean sprouts. It is known for its smoky 'wok hei' flavor, savory sauce, and slightly sweet undertones.",
            ingredients: ["Flat rice noodles (kway teow)", "Prawns, peeled and deveined", "Cockles, cleaned", "Eggs",
                "Bean sprouts", "Dark soy sauce", "Light soy sauce", "Garlic, minced", "Chives or spring onions", "Vegetable oil"],
            steps: ["Heat a wok over high heat and add oil, then sauté minced garlic until fragrant.",
                "Add prawns and cockles, stir-frying until partially cooked.", "Add the flat rice noodles and drizzle with dark and light soy sauce, tossing to coat evenly.",
                "Push noodles to the side and scramble eggs in the wok, then mix with the noodles.",
                "Add bean sprouts and chives, stir-frying quickly to maintain a slightly crunchy texture.", "Serve hot, enjoying the signature smoky flavor from the high-heat stir-fry."]
        },

        "Penang Laksa": {
            intro: "Penang Asam Laksa is a tangy, spicy noodle soup famous worldwide. Its tamarind-based broth, combined with mackerel fish and fresh herbs, makes it a refreshing yet bold dish.",
            ingredients: ["Thick rice noodles", "Mackerel fish", "Tamarind slices (asam keping)", "Torch ginger flower (bunga kantan)",
                "Mint leaves", "Onions, chilies", "Shrimp paste (petis udang)"],
            steps: ["Boil fish, debone, and flake the flesh.", "Use the fish broth as the base and add tamarind slices for sourness.",
                "Blend chili, onion, lemongrass, and torch ginger, then add to broth.", "Serve with rice noodles, garnished with mint, cucumber, onion, and shrimp paste."]
        },

        // ================= TERENGGANU =================
        "Nasi Dagang": {
            intro: "Nasi Dagang is Terengganu’s signature dish featuring rice steamed with coconut milk and fenugreek seeds, served with flavorful tuna curry. It is fragrant, rich, and often enjoyed for breakfast or festive occasions.",
            ingredients: ["Glutinous rice", "Regular rice (optional, for texture)", "Coconut milk", "Salt",
                "Fenugreek seeds", "Tuna (fresh or canned) for curry", "Curry spices (turmeric, chili, onion, garlic)"],
            steps: ["Rinse and soak the rice, then steam it with coconut milk and fenugreek seeds until cooked and fragrant.",
                "Prepare the tuna curry by cooking tuna with curry spices until flavorful and tender.", "Serve the steamed coconut rice alongside the tuna curry."]
        },

        "Keropok Lekor": {
            intro: "Keropok Lekor is a popular Terengganu snack made from fish paste and sago flour, shaped into long rolls and boiled or deep-fried. It has a chewy texture and is often enjoyed with spicy dipping sauce.",
            ingredients: ["Fish paste (mackerel or tenggiri)", "Sago flour", "Salt", "Water"],
            steps: ["Mix fish paste with sago flour, salt, and a little water to form a smooth dough.", "Shape the mixture into long cylindrical rolls.",
                "Boil the rolls until cooked, then optionally deep-fry for a crispier texture.", "Serve hot with chili sauce for dipping."]
        },

        // ================= IPOH =================
        "Ipoh White Coffee": {
            intro: "Ipoh White Coffee is a specialty coffee from Ipoh, made by roasting coffee beans with palm oil margarine and served with sweetened condensed milk. It is known for its smooth, creamy texture and rich aroma.",
            ingredients: ["Coffee beans", "Palm oil margarine for roasting", "Sweetened condensed milk", "Sugar (optional)"],
            steps: ["Roast the coffee beans with a small amount of palm oil margarine until fragrant and lightly golden.",
                "Grind the roasted beans and brew the coffee using your preferred method.", "Serve the brewed coffee hot with a generous amount of condensed milk, adding sugar if desired."]
        },

        "Bean Sprout Chicken": {
            intro: "Bean Sprout Chicken, or Nga Choy Kai, is a classic Ipoh dish consisting of tender poached chicken served with crisp blanched bean sprouts. It is simple yet flavorful, often complemented with soy sauce and sesame oil.",
            ingredients: ["Whole chicken or chicken pieces", "Fresh bean sprouts", "Soy sauce", "Sesame oil", "Ginger slices (optional)", "Spring onions for garnish"],
            steps: ["Poach the chicken in water with ginger slices until fully cooked and tender.", "Blanch the bean sprouts briefly in boiling water until just tender-crisp.",
                "Slice the chicken and arrange it on a plate with the bean sprouts.", "Drizzle with soy sauce and sesame oil, and garnish with chopped spring onions before serving."]
        },

        // ================= PAHANG =================
        "Satay Temerloh": {
            intro: "Satay Temerloh is a famous Pahang delicacy featuring skewered meat grilled over charcoal and served with rich peanut sauce. It is known for its tender texture and smoky flavor from the open grilling.",
            ingredients: ["Meat (chicken, beef, or lamb), cut into cubes", "Satay marinade (garlic, turmeric, coriander, soy sauce, and sugar)",
                "Peanut sauce (thick and slightly sweet)", "Bamboo skewers, soaked in water"],
            steps: ["Marinate the meat cubes in the satay marinade for at least 1–2 hours.", "Thread the marinated meat onto soaked bamboo skewers.",
                "Grill the skewers over medium charcoal heat until cooked through and slightly charred.", "Serve hot with peanut sauce on the side."]
        },

        "Roti Jala": {
            intro: "Roti Jala is a traditional Pahang snack consisting of thin, net-like crepes served with curry. It’s light, soft, and perfect for soaking up flavorful gravies.",
            ingredients: ["All-purpose flour", "Eggs", "Coconut milk", "Water", "Salt", "Curry (chicken, beef, or vegetable) for serving"],
            steps: ["Mix flour, eggs, coconut milk, water, and a pinch of salt to form a smooth batter.",
                "Pour the batter through a special roti jala mold or squeeze bottle onto a hot greased pan in a lacy, net-like pattern.",
                "Cook until lightly golden on the bottom, then carefully fold or roll.", "Serve warm with curry for dipping."]
        },

        // ================= KUALA LUMPUR =================
        "Hokkien Mee": {
            intro: "KL Hokkien Mee is a beloved noodle dish featuring thick yellow noodles stir-fried in dark soy sauce with pork, prawns, and cabbage. It has a rich, savory flavor with a slightly smoky aroma from the wok-frying process.",
            ingredients: ["Thick yellow noodles", "Dark soy sauce", "Pork slices or minced pork", "Prawns, peeled and deveined",
                "Cabbage, chopped", "Garlic, minced", "Vegetable oil"],
            steps: ["Heat oil in a wok and sauté garlic until fragrant.", "Add pork and prawns, stir-frying until cooked.",
                "Add noodles and dark soy sauce, tossing to coat evenly.", "Add cabbage and stir-fry briefly until slightly softened.",
                "Serve hot with a side of pickled green chilies if desired."]
        },

        "Nasi Lemak": {
            intro: "Nasi Lemak is Malaysia’s iconic national dish, consisting of rice cooked in rich coconut milk, served with spicy sambal, crispy anchovies, roasted peanuts, and boiled or fried egg. It’s a fragrant, flavorful meal enjoyed for breakfast or any time of day.",
            ingredients: ["Rice (preferably jasmine or long-grain)", "Coconut milk", "Pandan leaves (optional for fragrance)",
                "Sambal (spicy chili paste)", "Anchovies, fried until crispy", "Roasted peanuts", "Eggs (boiled or fried)"],
            steps: ["Rinse and cook rice with coconut milk and pandan leaves until fluffy and fragrant.",
                "Prepare sambal separately by cooking chili paste with onions, garlic, and seasoning.",
                "Fry anchovies until crispy and roast peanuts if not pre-roasted.", "Serve the coconut rice with sambal, anchovies, peanuts, and boiled or fried egg."]
        },

        // ================= SELANGOR =================
        "Bak Kut Teh": {
            intro: "Bak Kut Teh is a comforting Selangor specialty, featuring pork ribs simmered in a rich herbal broth infused with garlic and aromatic spices. The soup is hearty, flavorful, and often served with rice or fried dough sticks.",
            ingredients: ["Pork ribs, cut into pieces", "Garlic cloves, crushed", "Soy sauce", "Water",
                "Bak Kut Teh herbal soup mix or combination of herbs (star anise, cinnamon, cloves, angelica root)",
                "Optional: dried mushrooms or tofu puffs"],
            steps: ["Rinse the pork ribs and blanch them briefly in boiling water to remove impurities.",
                "Simmer the ribs with garlic, herbal mix, and water for 1–2 hours until the meat is tender.",
                "Season the soup with soy sauce and additional spices to taste.", "Serve hot, optionally with steamed rice or fried dough sticks on the side."]
        },

        "Roti Canai": {
            intro: "Roti Canai is a flaky, crispy flatbread from Selangor, typically served with dhal or curry. It is a popular breakfast or snack item, known for its soft layers and golden-brown crust.",
            ingredients: [
                "All-purpose flour",
                "Water",
                "Ghee or oil",
                "Salt",
                "Curry or dhal for dipping"
            ],
            steps: [
                "Prepare the dough by mixing flour, water, oil, and salt; knead until smooth and let it rest for at least 30 minutes.",
                "Divide the dough into portions, then stretch each portion thinly and fold into layers.",
                "Cook on a hot, lightly oiled pan until golden and crisp on both sides.",
                "Serve warm with dhal or curry for dipping."
            ]
        },

        // ================= PUTRAJAYA =================
        "Rojak": {
            intro: "Rojak is a refreshing Putrajaya salad made from a mix of fruits and vegetables, tossed in a sweet and savory peanut sauce. It has a crunchy, tangy, and nutty flavor that makes it a popular snack or appetizer.",
            ingredients: ["Cucumber, sliced or julienned", "Pineapple, diced", "Firm tofu, cubed and lightly fried",
                "Turnip or jicama (optional), sliced", "Peanut sauce (sweet and slightly spicy)", "Crushed peanuts for garnish"],
            steps: [
                "Prepare the fruits and vegetables by washing and cutting them into bite-sized pieces.", "Lightly fry the tofu cubes until golden brown.",
                "Mix all the ingredients in a bowl and pour over the peanut sauce.", "Sprinkle crushed peanuts on top and serve immediately for freshness."]
        },

        "Roti John": {
            intro: "Roti John is a popular Malaysian street food consisting of a baguette filled with a savory omelet, minced meat, onions, and sauce. It is flavorful, hearty, and perfect for a quick meal on the go.",
            ingredients: ["Baguette or long bread roll", "Eggs", "Minced meat (chicken, beef, or mutton)",
                "Onions, finely chopped", "Chili sauce or ketchup", "Salt and pepper to taste", "Cooking oil"],
            steps: ["Beat the eggs and mix them with minced meat, chopped onions, salt, and pepper.",
                "Heat a little oil in a pan and pour in the egg mixture, cooking like an omelet.", "Slice the baguette horizontally and place it on the pan to lightly toast.",
                "Place the cooked omelet on the bread, drizzle with chili sauce, and fold the bread over.", "Serve warm as a hearty sandwich."]
        },

        // ================= NEGERI SEMBILAN =================
        "Grilled Crab": {
            intro: "Grilled Crab is a Negeri Sembilan specialty where fresh crabs are marinated in a blend of aromatic spices and grilled until smoky and tender. It is typically served hot with a squeeze of lime for added zest.",
            ingredients: ["Fresh crab", "Spice mix (chili, turmeric, garlic, and ginger)",
                "Butter or cooking oil", "Lime wedges"],
            steps: ["Clean the crab thoroughly and crack the claws slightly for better cooking.",
                "Marinate the crab with the spice mix and let it absorb flavors for 30–60 minutes.",
                "Grill the crab over medium heat until the shell turns bright red and the meat is cooked through.",
                "Serve hot with lime wedges for squeezing over the crab."]
        },

        "Char Siew Pau": {
            intro: "Char Siew Pau is a popular steamed bun in Negeri Sembilan, filled with sweet and savory barbecued pork. The soft, fluffy bun pairs perfectly with the rich char siew filling.",
            ingredients: ["All-purpose flour", "Yeast", "Sugar", "Water or milk", "Barbecued pork (char siew), diced", "Hoisin or oyster sauce (optional for filling)"],
            steps: [
                "Prepare the dough by mixing flour, yeast, sugar, and liquid, then knead until smooth and let it rise until doubled in size.",
                "Divide the dough into portions and flatten each piece before placing the char siew filling in the center.",
                "Seal the dough around the filling and shape into buns.", "Steam the buns for 12–15 minutes until they are fluffy and cooked through."]
        },

        // ================= MELAKA =================
        "Chicken Rice Ball": {
            intro: "Chicken Rice Ball is a famous Melaka dish where fragrant rice is molded into small balls and served with tender poached chicken. It is usually accompanied by a light soy-based sauce and garlic flavor.",
            ingredients: ["Rice (preferably jasmine or long-grain)", "Whole chicken or chicken breast", "Soy sauce",
                "Garlic cloves", "Ginger (optional)", "Spring onions (for garnish)"],
            steps: ["Cook rice with chicken stock, garlic, and ginger to make fragrant chicken rice.",
                "Poach the chicken until tender and slice into serving pieces.", "Shape the cooked rice into small, compact balls.",
                "Serve the rice balls alongside the poached chicken and drizzle with soy sauce. Garnish with chopped spring onions."]
        },

        "Satay Celup": {
            intro: "Satay Celup is Melaka’s unique hotpot-style satay where a variety of skewered ingredients are cooked by dipping them into a communal pot of boiling peanut sauce. It's a fun and social way to enjoy satay.",
            ingredients: ["Assorted satay skewers (meat, seafood, vegetables, tofu)",
                "Peanut sauce (thick and spicy)", "Lettuce leaves or fresh herbs (optional for serving)"],
            steps: ["Prepare a thick peanut sauce and bring it to a gentle boil in a pot.",
                "Arrange assorted skewers on a plate for easy access.",
                "Dip each skewer into the boiling sauce until cooked or heated through.",
                "Serve hot, optionally with lettuce or fresh herbs on the side."]
        },

        // ================= JOHOR =================
        "Laksa Johor": {
            intro: "Laksa Johor is a unique noodle dish from Johor, using spaghetti instead of rice noodles due to colonial influence. The gravy is rich, fish-based, and flavored with coconut milk, tamarind, and aromatic herbs.",
            ingredients: ["Spaghetti noodles", "Mackerel fish (ikan kembung)", "Coconut milk", "Tamarind juice", "Onions, garlic, ginger", "Chili paste",
                "Herbs (kesum, daun selasih)", "Lime, cucumber, long beans, bean sprouts for garnish"],
            steps: ["Boil and flake the mackerel fish, removing bones.", "Blend onions, garlic, ginger, and chili paste into a smooth mix.",
                "Cook blended spices with oil until fragrant.", "Add fish meat, coconut milk, and tamarind juice, simmer until thick.",
                "Serve spaghetti topped with gravy and fresh garnishes."]
        },

        "Mee Rebus": {
            intro: "Mee Rebus is a popular Johor noodle dish served with yellow noodles in a thick, sweet, and slightly spicy gravy. The sauce is made from potatoes, curry spices, and shrimp paste, giving it a rich flavor.",
            ingredients: ["Yellow noodles", "Potatoes", "Shrimp paste", "Curry powder", "Fried shallots", "Lime"],
            steps: ["Boil and mash potatoes to create the base of the gravy.", "Cook the mashed potatoes with curry powder, shrimp paste, and spices until thick.",
                "Blanch yellow noodles and place them in a bowl.", "Pour the gravy over the noodles and garnish with fried shallots, boiled egg, green chili, and a squeeze of lime."]
        },

        "Kacang Pool": {
            intro: "Kacang Pool is a Johor specialty inspired by the Middle Eastern dish foul medames. It is made from mashed fava beans cooked with minced beef and spices, usually served with toasted bread and a fried egg.",
            ingredients: ["Fava beans", "Minced beef", "Onions", "Garlic", "Spices", "Bread"],
            steps: ["Mash the fava beans and cook them with onions, garlic, and spices.", "Add minced beef and simmer until the mixture thickens.",
                "Serve hot in a bowl, topped with a fried egg and sliced green chili.", "Enjoy with buttered toasted bread on the side."]
        },

        // ================= SARAWAK =================
        "Kolo Mee": {
            intro: "Kolo Mee is a beloved Sarawak noodle dish featuring springy egg noodles tossed in soy sauce and lard oil, topped with minced pork, char siu, and spring onions.",
            ingredients: ["Egg noodles", "Minced pork", "Char siu", "Light soy sauce", "Spring onions"],
            steps: ["Boil the noodles until soft, then drain.", "Mix noodles with soy sauce and a little oil.",
                "Top with minced pork, char siu, and garnish with spring onions before serving."]
        },

        "Manok Pansoh": {
            intro: "Manok Pansoh is a traditional Iban chicken dish from Sarawak, cooked inside bamboo with herbs and spices. The bamboo gives the dish a smoky aroma and rich flavor.",
            ingredients: ["Chicken pieces", "Bamboo tube", "Lemongrass", "Ginger", "Garlic", "Local herbs"],
            steps: ["Stuff the chicken, lemongrass, ginger, garlic, and herbs into a bamboo tube.", "Seal the bamboo with leaves or foil.",
                "Cook the bamboo tube over an open fire until the chicken is tender.", "Serve hot directly from the bamboo."]
        },

        // ================= LABUAN =================
        "Ambuyat": {
            intro: "Ambuyat is a traditional sticky sago starch dish, a staple in Labuan and Brunei, usually eaten with bamboo sticks and served with flavorful dipping sauces.",
            ingredients: ["Sago starch", "Hot water", "Assorted dipping sauces (chili, sour, or fish-based)"],
            steps: ["Mix sago starch with hot water until it turns into a sticky, glue-like texture.",
                "Scoop using bamboo sticks (chandas).", "Dip into sauces and eat while warm."]
        },

        "Sambal Udang": {
            intro: "Sambal Udang is a flavorful Malaysian dish of prawns cooked in a spicy chili paste with a tangy tamarind kick.",
            ingredients: ["Prawns (large or medium, shelled and deveined)", "Chili paste (blended dried chilies, onions, garlic)",
                "Tamarind juice", "Onions (sliced)", "Cooking oil", "Salt and sugar"],
            steps: ["Heat oil and fry sliced onions until soft.", "Add chili paste and cook until fragrant and oil separates.",
                "Stir in tamarind juice, salt, and sugar.", "Add prawns and cook until they turn red and are fully cooked.",
                "Serve hot with steamed rice."]
        },

        // ================= SABAH =================
        "Tuaran Mee": {
            intro: "Tuaran Mee is a signature noodle dish from Sabah, made with handmade egg noodles that are first fried, then stir-fried with vegetables and eggs.",
            ingredients: ["Tuaran egg noodles (or regular egg noodles)", "Vegetables (choy sum, cabbage, or similar)",
                "Eggs", "Soy sauce", "Garlic", "Cooking oil"],
            steps: [
                "Fry the noodles in oil until lightly crisp and golden.", "Stir-fry garlic and vegetables until fragrant.",
                "Push vegetables aside and scramble eggs in the pan.", "Add fried noodles and season with soy sauce.",
                "Toss everything together and serve hot."]
        },

        "Hinava": {
            intro: "Hinava is a Kadazan-Dusun raw fish salad from Sabah, marinated in lime juice with herbs and spices, often compared to ceviche.",
            ingredients: ["Fresh mackerel fish fillet", "Lime juice", "Red chili and bird’s eye chili",
                "Ginger (thinly sliced)", "Shallots", "Salt", "Grated dried bambangan seed (optional)"],
            steps: ["Slice the fresh fish into thin pieces.", "Marinate fish in lime juice until the flesh turns opaque.",
                "Add chili, ginger, and shallots into the mixture.", "Season with salt and optional bambangan seed.",
                "Mix well and serve immediately as a fresh salad."]
        }

    };


    // Populate the detail sections
    if (foodData[foodName]) {
        document.getElementById("food-intro").textContent = foodData[foodName].intro;

        const ingredientsList = document.getElementById("food-ingredients");
        ingredientsList.innerHTML = "";
        foodData[foodName].ingredients.forEach(item => {
            let li = document.createElement("li");
            li.classList.add("list-group-item");
            li.textContent = item;
            ingredientsList.appendChild(li);
        });

        const stepsList = document.getElementById("food-steps");
        stepsList.innerHTML = "";
        foodData[foodName].steps.forEach(step => {
            let li = document.createElement("li");
            li.classList.add("list-group-item");
            li.textContent = step;
            stepsList.appendChild(li);
        });
    } else {
        document.getElementById("food-intro").textContent = "Details not available for this food.";
    }
} else {
    document.getElementById("food-name").textContent = "Food Not Found";
    document.getElementById("food-intro").textContent = "Please go back to the Explore page.";
}
