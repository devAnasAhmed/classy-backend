const Settings = require('../models/Settings');

// Default settings
const DEFAULTS = {
  whatsapp_number: '201226832747',
  store_name: 'CLASSY - براند راق',
  store_email: 'info@classy-shop.com',
  store_phone: '201226832747',
  store_address: 'القاهرة، مصر',
  facebook_url: '',
  instagram_url: '',
  tiktok_url: '',
  shipping_standard_cost: '0',
  shipping_express_cost: '50',
  shipping_standard_days: '3',
  shipping_express_days: '1',
};

exports.getAll = async (req, res) => {
  try {
    let settings = await Settings.find();

    // Create defaults if missing
    for (const [key, value] of Object.entries(DEFAULTS)) {
      const exists = settings.find(s => s.key === key);
      if (!exists) {
        await Settings.create({ key, value });
      }
    }

    settings = await Settings.find();
    const result = {};
    settings.forEach(s => { result[s.key] = s.value; });

    res.json({ success: true, data: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const setting = await Settings.findOne({ key: req.params.key });
    if (!setting) {
      const defaultValue = DEFAULTS[req.params.key];
      if (defaultValue !== undefined) {
        return res.json({ success: true, data: { key: req.params.key, value: defaultValue } });
      }
      return res.status(404).json({ success: false, message: 'الإعداد غير موجود' });
    }
    res.json({ success: true, data: setting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { key, value } = req.body;
    if (!key || value === undefined) {
      return res.status(400).json({ success: false, message: 'المفتاح والقيمة مطلوبان' });
    }

    const setting = await Settings.findOneAndUpdate(
      { key },
      { key, value },
      { new: true, upsert: true }
    );

    res.json({ success: true, data: setting, message: 'تم تحديث الإعداد بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMany = async (req, res) => {
  try {
    const updates = req.body; // { key1: value1, key2: value2 }
    const results = [];

    for (const [key, value] of Object.entries(updates)) {
      const setting = await Settings.findOneAndUpdate(
        { key },
        { key, value },
        { new: true, upsert: true }
      );
      results.push(setting);
    }

    res.json({ success: true, data: results, message: 'تم تحديث الإعدادات بنجاح' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
