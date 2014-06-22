<link rel="stylesheet" type="text/css" href="/css/scaffold/event/_form.css" />

                    <h4>イベント名</h4>
                    <input type="text" name="title" id="title"
                        ng-model="event.name " required />
                    
                    <h4>イベント終了日時</h4>
                    <label>
                        <input type="number" name="year"
                            ng-pattern="/^[0-9]*$/" ng-model="event.timelimit.year" required />
                        年
                    </label>
                    <label>
                        <input
                            type="number" name="month"
                            ng-pattern="/^[0-9]*$/" ng-model="event.timelimit.month" required />
                        月
                    </label>
                    <label>
                        <input type="number" name="day"
                            ng-pattern="/^[0-9]*$/" ng-model="event.timelimit.day" required />
                        日
                    </label>
                    <label>
                        <input type="number" name="hour"
                            ng-pattern="/^[0-9]*$/" ng-model="event.timelimit.hour" required />
                        時
                    </label>
                    <label>
                        <input type="number" name="minute"
                            ng-pattern="/^[0-9]*$/" ng-model="event.timelimit.minute" required />
                        分
                    </label>
                    
                    <h4>イベント紹介文</h4>
                    <textarea name="description" ng-model="event.description" required>
                    </textarea>

                    <h4>イベント詳細</h4>
