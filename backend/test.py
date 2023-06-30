class Pitchforks(DukeMeal):
    def __init__(self):
        super().__init__()
    
    def addItem(self, main, addon, side):
        db = get_db()
        query = db.execute("select * from Meals where Name = ? and Restaurant = ?", (main, "Pitchforks"))
        itemInfo = query.fetchone()
        print("Information about item:")
        print(itemInfo)

        self.name = itemInfo[0]
        self.calories += 0 if isinstance(itemInfo[1], str) else itemInfo[1]
        self.protein += 0 if isinstance(itemInfo[19], str) else itemInfo[19]
        self.carbs += 0 if isinstance(itemInfo[14], str) else itemInfo[14]
        self.fat += 0 if isinstance(itemInfo[3], str) else itemInfo[3]

        for elem in addon:
            query = db.execute("select * from Meals where Name = ? and Restaurant = ?", (elem, "Pitchforks"))
            addonInfo = query.fetchone()
            print("Information about add on:")
            print(addonInfo)

            self.calories += 0 if isinstance(addonInfo[1], str) else addonInfo[1]
            self.protein += 0 if isinstance(addonInfo[19], str) else addonInfo[19]
            self.carbs += 0 if isinstance(addonInfo[14], str) else addonInfo[14]
            self.fat += 0 if isinstance(addonInfo[3], str) else addonInfo[3]

        for elem in side:
            query = db.execute("select * from Meals where Name = ? and Restaurant = ?", (elem, "Pitchforks"))
            sideInfo = query.fetchone()
            print("Information about side:")
            print(sideInfo)

            self.calories += 0 if isinstance(sideInfo[1], str) else sideInfo[1]
            self.protein += 0 if isinstance(sideInfo[19], str) else sideInfo[19]
            self.carbs += 0 if isinstance(sideInfo[14], str) else sideInfo[14]
            self.fat += 0 if isinstance(sideInfo[3], str) else sideInfo[3]

        db.close()

        return self.main, self.calories, self.protein, self.carbs, self.fat