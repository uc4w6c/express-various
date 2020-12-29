# 仮メモ
express-validator

router.post('/', 
    [
        check('userName').isLength({ min: 1 }).withMessage('必須項目です')
    ]
    , (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
    }
)


app.js

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

