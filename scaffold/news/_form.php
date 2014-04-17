<link rel="stylesheet" type="text/css" href="/css/scaffold/news/_form.css" />

                    <h4>ニュースタイトル</h4>
                    <input type="text" name="title" id="title"
                        ng-model="news.title" required />
                    
                    <h4>ニュース更新日</h4>
                    <label>
                        <input type="number" name="year"
                            ng-pattern="/^[0-9]*$/" ng-model="news.date.year" required />
                        年
                    </label>
                    <label>
                        <input
                            type="number" name="month"
                            ng-pattern="/^[0-9]*$/" ng-model="news.date.month" required />
                        月
                    </label>
                    <label>
                        <input type="number" name="day"
                            ng-pattern="/^[0-9]*$/" ng-model="news.date.day" required />
                        日
                    </label>
                    
                    <h4>ニュース内容</h4>
                    <textarea name="description" ng-model="news.description" required>
                    </textarea>
